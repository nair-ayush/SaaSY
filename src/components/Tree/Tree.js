import React, { Component } from "react";
import * as d3 from "d3";

class Tree extends Component {
    constructor(props) {
        super(props);
        this.drawTree = this.drawTree.bind(this);
    }
    componentDidMount() {
        this.drawTree();
    }
    componentDidUpdate() {
        this.drawTree();
    }
    visit(parent, visitFn, childrenFn) {
        if (!parent) return;
        visitFn(parent);
        var children = childrenFn(parent);
        if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
                this.visit(children[i], visitFn, childrenFn);
            }
        }
    }
    sortTree(tree) {
        tree.sort(function(a, b) {
            return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
        });
    }
    pan(domNode, direction, panSpeed, panTimer, svgGroup, zoomListener) {
        var speed = panSpeed;
        if (panTimer) {
            clearTimeout(panTimer);
            var translateCoords = d3.transform(svgGroup.attr("transform"));
            if (direction == "left" || direction == "right") {
                var translateX =
                    direction == "left"
                        ? translateCoords.translate[0] + speed
                        : translateCoords.translate[0] - speed;
                var translateY = translateCoords.translate[1];
            } else if (direction == "up" || direction == "down") {
                var translateX = translateCoords.translate[0];
                var translateY =
                    direction == "up"
                        ? translateCoords.translate[1] + speed
                        : translateCoords.translate[1] - speed;
            }
            var scaleX = translateCoords.scale[0];
            var scaleY = translateCoords.scale[1];
            var scale = zoomListener.scale();
            svgGroup
                .transition()
                .attr(
                    "transform",
                    "translate(" +
                        translateX +
                        "," +
                        translateY +
                        ")scale(" +
                        scale +
                        ")"
                );
            d3.select(domNode)
                .select("g.node")
                .attr(
                    "transform",
                    "translate(" + translateX + "," + translateY + ")"
                );
            zoomListener.scale(zoomListener.scale());
            zoomListener.translate([translateX, translateY]);
            panTimer = setTimeout(function() {
                this.pan(
                    domNode,
                    direction,
                    speed,
                    panTimer,
                    svgGroup,
                    zoomListener
                );
            }, 50);
        }
    }
    zoom(svgGroup) {
        svgGroup.attr(
            "transform",
            "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
        );
    }
    initiateDrag(d, domNode, draggingNode, svgGroup, nodes, tree, dragStarted) {
        draggingNode = d;
        d3.select(domNode)
            .select(".ghostCircle")
            .attr("pointer-events", "none");
        d3.selectAll(".ghostCircle").attr("class", "ghostCircle show");
        d3.select(domNode).attr("class", "node activeDrag");

        svgGroup.selectAll("g.node").sort(function(a, b) {
            // select the parent and sort the path's
            if (a.id != draggingNode.id) return 1;
            // a is not the hovered element, send "a" to the back
            else return -1; // a is the hovered element, bring "a" to the front
        });
        // if nodes has children, remove the links and nodes
        if (nodes.length > 1) {
            // remove link paths
            var links = tree.links(nodes);
            var nodePaths = svgGroup
                .selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                })
                .remove();
            // remove child nodes
            var nodesExit = svgGroup
                .selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id;
                })
                .filter(function(d, i) {
                    if (d.id == draggingNode.id) {
                        return false;
                    }
                    return true;
                })
                .remove();
        }
        // remove parent link
        var parentLink = tree.links(tree.nodes(draggingNode.parent));
        svgGroup
            .selectAll("path.link")
            .filter(function(d, i) {
                if (d.target.id == draggingNode.id) {
                    return true;
                }
                return false;
            })
            .remove();
        dragStarted = null;
    }
    endDrag(selectedNode, domNode, draggingNode, root, svgGroup) {
        selectedNode = null;
        d3.selectAll(".ghostCircle").attr("class", "ghostCircle");
        d3.select(domNode).attr("class", "node");
        // now restore the mouseover event or we won't be able to drag a 2nd time
        d3.select(domNode)
            .select(".ghostCircle")
            .attr("pointer-events", "");
        this.updateTempConnector(draggingNode, selectedNode, svgGroup);
        if (draggingNode !== null) {
            this.update(root);
            this.centerNode(draggingNode);
            draggingNode = null;
        }
    }
    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(this.collapse);
            d.children = null;
        }
    }
    expand(d) {
        if (d._children) {
            d.children = d._children;
            d.children.forEach(this.expand);
            d._children = null;
        }
    }
    overCircle(draggingNode, selectedNode, d, svgGroup) {
        selectedNode = d;
        this.updateTempConnector(draggingNode, selectedNode, svgGroup);
    }
    outCircle(draggingNode, selectedNode, d, svgGroup) {
        selectedNode = null;
        this.updateTempConnector(draggingNode, selectedNode, svgGroup);
    }
    updateTempConnector(draggingNode, selectedNode, svgGroup) {
        var data = [];
        if (draggingNode !== null && selectedNode !== null) {
            // have to flip the source coordinates since we did this for the existing connectors on the original tree
            data = [
                {
                    source: {
                        x: selectedNode.y0,
                        y: selectedNode.x0
                    },
                    target: {
                        x: draggingNode.y0,
                        y: draggingNode.x0
                    }
                }
            ];
        }
        var link = svgGroup.selectAll(".templink").data(data);
        link.enter()
            .append("path")
            .attr("class", "templink")
            .attr("d", d3.svg.diagonal())
            .attr("pointer-events", "none");
        link.attr("d", d3.svg.diagonal());
        link.exit().remove();
    }
    centerNode(source, zoomListener, viewerHeight, viewerWidth, duration) {
        var scale = zoomListener.scale();
        var x = -source.y0;
        var y = -source.x0;
        x = x * scale + viewerWidth / 2;
        y = y * scale + viewerHeight / 2;
        d3.select("g")
            .transition()
            .duration(duration)
            .attr(
                "transform",
                "translate(" + x + "," + y + ")scale(" + scale + ")"
            );
        zoomListener.scale(scale);
        zoomListener.translate([x, y]);
    }
    toggleChildren(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        }
        return d;
    }
    click(d) {
        if (d3.event.defaultPrevented) return; // click suppressed
        d = this.toggleChildren(d);
        this.update(d);
        this.centerNode(d);
    }
    update(
        source,
        root,
        tree,
        viewerWidth,
        maxLabelLength,
        svgGroup,
        draggingNode,
        selectedNode,
        duration,
        diagonal
    ) {
        // Compute the new height, function counts total children of root node and sets tree height accordingly.
        // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
        // This makes the layout more consistent.
        var levelWidth = [1];
        var childCount = function(level, n) {
            if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) levelWidth.push(0);
                levelWidth[level + 1] += n.children.length;
                n.children.forEach(function(d) {
                    childCount(level + 1, d);
                });
            }
        };
        childCount(0, root);
        var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
        tree = tree.size([newHeight, viewerWidth]);
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);
        // Set widths between levels based on maxLabelLength.
        nodes.forEach(function(d) {
            d.y = d.depth * (maxLabelLength * 10); //maxLabelLength * 10px
            // alternatively to keep a fixed scale one can set a fixed depth per level
            // Normalize for fixed-depth by commenting out below line
            // d.y = (d.depth * 500); //500px per level.
        });
        // Update the nodes…
        var i;
        var node = svgGroup.selectAll("g.node").data(nodes, function(d) {
            return d.id || (d.id = ++i);
        });
        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node
            .enter()
            .append("g")
            .call(this.dragListener)
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", this.click);
        nodeEnter
            .append("circle")
            .attr("class", "nodeCircle")
            .attr("r", 0)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });
        nodeEnter
            .append("text")
            .attr("x", function(d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("class", "nodeText")
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                return d.name;
            })
            .style("fill-opacity", 0);
        // phantom node to give us mouseover in a radius around it
        nodeEnter
            .append("circle")
            .attr("class", "ghostCircle")
            .attr("r", 30)
            .attr("opacity", 0.2) // change this to zero to hide the target area
            .style("fill", "red")
            .attr("pointer-events", "mouseover")
            .on("mouseover", function(node) {
                this.overCircle(draggingNode, selectedNode, node);
            })
            .on("mouseout", function(node) {
                this.outCircle(draggingNode, selectedNode, node);
            });
        // Update the text to reflect whether node has children or not.
        node.select("text")
            .attr("x", function(d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                return d.name;
            });
        // Change the circle fill depending on whether it has children and is collapsed
        node.select("circle.nodeCircle")
            .attr("r", 4.5)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });
        // Transition nodes to their new position.
        var nodeUpdate = node
            .transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });
        // Fade the text in
        nodeUpdate.select("text").style("fill-opacity", 1);
        // Transition exiting nodes to the parent's new position.
        var nodeExit = node
            .exit()
            .transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();
        nodeExit.select("circle").attr("r", 0);
        nodeExit.select("text").style("fill-opacity", 0);
        // Update the links…
        var link = svgGroup.selectAll("path.link").data(links, function(d) {
            return d.target.id;
        });
        // Enter any new links at the parent's previous position.
        link.enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });
        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);
        // Transition exiting nodes to the parent's new position.
        link.exit()
            .transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();
        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    drawTree() {
        var treeJSON = d3.json("flare.json", function(error, treeData) {
            // Calculate total nodes, max label length
            var totalNodes = 0;
            var maxLabelLength = 0;
            // variables for drag/drop
            var selectedNode = null;
            var draggingNode = null;
            // panning variables
            var panSpeed = 200;
            var panBoundary = 20; // Within 20px from edges will pan when dragging.
            // Misc. variables
            var i = 0;
            var duration = 750;
            var root;
            // size of the diagram
            var viewerWidth = this.props.width;
            var viewerHeight = this.props.height;
            var tree = d3.layout.tree().size([viewerHeight, viewerWidth]);
            // define a d3 diagonal projection for use by the node paths later on.
            var diagonal = d3.svg.diagonal().projection(function(d) {
                return [d.y, d.x];
            });
            // Call visit function to establish maxLabelLength
            this.visit(
                treeData,
                function(d) {
                    totalNodes++;
                    maxLabelLength = Math.max(d.name.length, maxLabelLength);
                },
                function(d) {
                    return d.children && d.children.length > 0
                        ? d.children
                        : null;
                }
            );
            // Sort the tree initially incase the JSON isn't in a sorted order.
            this.sortTree(tree);
            // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
            var zoomListener = d3.behavior
                .zoom()
                .scaleExtent([0.1, 3])
                .on("zoom", this.zoom(svgGroup));
            // define the baseSvg, attaching a class for styling and the zoomListener
            var baseSvg = d3
                .select("#tree-container")
                .append("svg")
                .attr("width", viewerWidth)
                .attr("height", viewerHeight)
                .attr("class", "overlay")
                .call(zoomListener);
            // Define the drag listeners for drag/drop behaviour of nodes.
            var dragStarted;
            var nodes;
            var dragListener = d3.behavior
                .drag()
                .on("dragstart", function(d) {
                    if (d == root) {
                        return;
                    }
                    dragStarted = true;
                    nodes = tree.nodes(d);
                    d3.event.sourceEvent.stopPropagation();
                    // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
                })
                .on("drag", function(d) {
                    if (d == root) {
                        return;
                    }
                    if (dragStarted) {
                        var domNode = this;
                        this.initiateDrag(
                            d,
                            domNode,
                            draggingNode,
                            svgGroup,
                            nodes,
                            tree,
                            dragStarted
                        );
                    }

                    // get coords of mouseEvent relative to svg container to allow for panning
                    var relCoords = d3.mouse($("svg").get(0));
                    if (relCoords[0] < panBoundary) {
                        var panTimer = true;
                        this.pan(
                            this,
                            "left",
                            panSpeed,
                            panTimer,
                            svgGroup,
                            zoomListener
                        );
                    } else if (relCoords[0] > $("svg").width() - panBoundary) {
                        var panTimer = true;
                        this.pan(
                            this,
                            "right",
                            panSpeed,
                            panTimer,
                            svgGroup,
                            zoomListener
                        );
                    } else if (relCoords[1] < panBoundary) {
                        panTimer = true;
                        this.pan(
                            this,
                            "up",
                            panSpeed,
                            panTimer,
                            svgGroup,
                            zoomListener
                        );
                    } else if (relCoords[1] > $("svg").height() - panBoundary) {
                        panTimer = true;
                        this.pan(
                            this,
                            "down",
                            panSpeed,
                            panTimer,
                            svgGroup,
                            zoomListener
                        );
                    } else {
                        try {
                            clearTimeout(panTimer);
                        } catch (e) {}
                    }

                    d.x0 += d3.event.dy;
                    d.y0 += d3.event.dx;
                    var node = d3.select(this);
                    node.attr(
                        "transform",
                        "translate(" + d.y0 + "," + d.x0 + ")"
                    );
                    this.updateTempConnector(
                        draggingNode,
                        selectedNode,
                        svgGroup
                    );
                })
                .on("dragend", function(d) {
                    if (d == root) {
                        return;
                    }
                    domNode = this;
                    if (selectedNode) {
                        // now remove the element from the parent, and insert it into the new elements children
                        var index = draggingNode.parent.children.indexOf(
                            draggingNode
                        );
                        if (index > -1) {
                            draggingNode.parent.children.splice(index, 1);
                        }
                        if (
                            typeof selectedNode.children !== "undefined" ||
                            typeof selectedNode._children !== "undefined"
                        ) {
                            if (typeof selectedNode.children !== "undefined") {
                                selectedNode.children.push(draggingNode);
                            } else {
                                selectedNode._children.push(draggingNode);
                            }
                        } else {
                            selectedNode.children = [];
                            selectedNode.children.push(draggingNode);
                        }
                        // Make sure that the node being added to is expanded so user can see added node is correctly moved
                        this.expand(selectedNode);
                        this.sortTree();
                        this.endDrag(selectedNode, domNode, draggingNode, root);
                    } else {
                        this.endDrag(selectedNode, domNode, draggingNode, root);
                    }
                });
            // Append a group which holds all nodes and which the zoom Listener can act upon.
            var svgGroup = baseSvg.append("g");

            // Define the root
            root = treeData;
            root.x0 = viewerHeight / 2;
            root.y0 = 0;

            // Layout the tree initially and center on the root node.
            this.update(root);
            this.centerNode(root);
        });
    }
    render() {
        return <div className="tree" />;
    }
}

export default Tree;
