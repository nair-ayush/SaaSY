import React, { Component } from "react";
import Tree from "react-tree-graph";
import NavBar from "../../components/NavBar/NavBar";
import Popup from "../../components/Modal/Modal";
import SignIn from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import './App.css';
import { Launcher } from "react-chat-window";
const axios = require('axios');
// import { timingSafeEqual } from "crypto";
class App extends Component {
    constructor() {
        super();
        this.state = {
            // data: {
            //     name: "flare",
            //     children: [{
            //         name: "analytics",
            //         children: [{
            //             name: "cluster",
            //             children: [{
            //                 name: "AgglomerativeCluster",
            //                 id: 3938
            //             }, {
            //                 name: "CommunityStructure",
            //                 id: 3812
            //             }, {
            //                 name: "HierarchicalCluster",
            //                 id: 6714
            //             }, {
            //                 name: "MergeEdge",
            //                 id: 743
            //             }]
            //         }, {
            //             name: "graph",
            //             children: [{
            //                 name: "BetweennessCentrality",
            //                 id: 3534
            //             }, {
            //                 name: "LinkDistance",
            //                 id: 5731
            //             }, {
            //                 name: "MaxFlowMinCut",
            //                 id: 7840
            //             }, {
            //                 name: "ShortestPaths",
            //                 id: 5914
            //             }, {
            //                 name: "SpanningTree",
            //                 id: 3416
            //             }]
            //         }, {
            //             name: "optimization",
            //             children: [{
            //                 name: "AspectRatioBanker",
            //                 id: 7074
            //             }]
            //         }]
            //     }, {
            //         name: "animate",
            //         children: [{
            //             name: "Easing",
            //             id: 17010
            //         }, {
            //             name: "FunctionSequence",
            //             id: 5842
            //         }, {
            //             name: "interpolate",
            //             children: [{
            //                 name: "ArrayInterpolator",
            //                 id: 1983
            //             }, {
            //                 name: "ColorInterpolator",
            //                 id: 2047
            //             }, {
            //                 name: "DateInterpolator",
            //                 id: 1375
            //             }, {
            //                 name: "Interpolator",
            //                 id: 8746
            //             }, {
            //                 name: "MatrixInterpolator",
            //                 id: 2202
            //             }, {
            //                 name: "NumberInterpolator",
            //                 id: 1382
            //             }, {
            //                 name: "ObjectInterpolator",
            //                 id: 1629
            //             }, {
            //                 name: "PointInterpolator",
            //                 id: 1675
            //             }, {
            //                 name: "RectangleInterpolator",
            //                 id: 2042
            //             }]
            //         }, {
            //             name: "ISchedulable",
            //             id: 1041
            //         }, {
            //             name: "Parallel",
            //             id: 5176
            //         }, {
            //             name: "Pause",
            //             id: 449
            //         }, {
            //             name: "Scheduler",
            //             id: 5593
            //         }, {
            //             name: "Sequence",
            //             id: 5534
            //         }, {
            //             name: "Transition",
            //             id: 9201
            //         }, {
            //             name: "Transitioner",
            //             id: 19975
            //         }, {
            //             name: "TransitionEvent",
            //             id: 1116
            //         }, {
            //             name: "Tween",
            //             id: 6006
            //         }]
            //     }, {
            //         name: "data",
            //         children: [{
            //             name: "converters",
            //             children: [{
            //                 name: "Converters",
            //                 id: 721
            //             }, {
            //                 name: "DelimitedTextConverter",
            //                 id: 4294
            //             }, {
            //                 name: "GraphMLConverter",
            //                 id: 9800
            //             }, {
            //                 name: "IDataConverter",
            //                 id: 1314
            //             }, {
            //                 name: "JSONConverter",
            //                 id: 2220
            //             }]
            //         }, {
            //             name: "DataField",
            //             id: 1759
            //         }, {
            //             name: "DataSchema",
            //             id: 2165
            //         }, {
            //             name: "DataSet",
            //             id: 586
            //         }, {
            //             name: "DataSource",
            //             id: 3331
            //         }, {
            //             name: "DataTable",
            //             id: 772
            //         }, {
            //             name: "DataUtil",
            //             id: 3322
            //         }]
            //     }, {
            //         name: "display",
            //         children: [{
            //             name: "DirtySprite",
            //             id: 8833
            //         }, {
            //             name: "LineSprite",
            //             id: 1732
            //         }, {
            //             name: "RectSprite",
            //             id: 3623
            //         }, {
            //             name: "TextSprite",
            //             id: 10066
            //         }]
            //     }, {
            //         name: "flex",
            //         children: [{
            //             name: "FlareVis",
            //             id: 4116
            //         }]
            //     }, {
            //         name: "physics",
            //         children: [{
            //             name: "DragForce",
            //             id: 1082
            //         }, {
            //             name: "GravityForce",
            //             id: 1336
            //         }, {
            //             name: "IForce",
            //             id: 319
            //         }, {
            //             name: "NBodyForce",
            //             id: 10498
            //         }, {
            //             name: "Particle",
            //             id: 2822
            //         }, {
            //             name: "Simulation",
            //             id: 9983
            //         }, {
            //             name: "Spring",
            //             id: 2213
            //         }, {
            //             name: "SpringForce",
            //             id: 1681
            //         }]
            //     }, {
            //         name: "query",
            //         children: [{
            //             name: "AggregateExpression",
            //             id: 1616
            //         }, {
            //             name: "And",
            //             id: 1027
            //         }, {
            //             name: "Arithmetic",
            //             id: 3891
            //         }, {
            //             name: "Average",
            //             id: 891
            //         }, {
            //             name: "BinaryExpression",
            //             id: 2893
            //         }, {
            //             name: "Comparison",
            //             id: 5103
            //         }, {
            //             name: "CompositeExpression",
            //             id: 3677
            //         }, {
            //             name: "Count",
            //             id: 781
            //         }, {
            //             name: "DateUtil",
            //             id: 4141
            //         }, {
            //             name: "Distinct",
            //             id: 933
            //         }, {
            //             name: "Expression",
            //             id: 5130
            //         }, {
            //             name: "ExpressionIterator",
            //             id: 3617
            //         }, {
            //             name: "Fn",
            //             id: 3240
            //         }, {
            //             name: "If",
            //             id: 2732
            //         }, {
            //             name: "IsA",
            //             id: 2039
            //         }, {
            //             name: "Literal",
            //             id: 1214
            //         }, {
            //             name: "Match",
            //             id: 3748
            //         }, {
            //             name: "Maximum",
            //             id: 843
            //         }, {
            //             name: "methods",
            //             children: [{
            //                 name: "add",
            //                 id: 593
            //             }, {
            //                 name: "and",
            //                 id: 330
            //             }, {
            //                 name: "average",
            //                 id: 287
            //             }, {
            //                 name: "count",
            //                 id: 277
            //             }, {
            //                 name: "distinct",
            //                 id: 292
            //             }, {
            //                 name: "div",
            //                 id: 595
            //             }, {
            //                 name: "eq",
            //                 id: 594
            //             }, {
            //                 name: "fn",
            //                 id: 460
            //             }, {
            //                 name: "gt",
            //                 id: 603
            //             }, {
            //                 name: "gte",
            //                 id: 625
            //             }, {
            //                 name: "iff",
            //                 id: 748
            //             }, {
            //                 name: "isa",
            //                 id: 461
            //             }, {
            //                 name: "lt",
            //                 id: 597
            //             }, {
            //                 name: "lte",
            //                 id: 619
            //             }, {
            //                 name: "max",
            //                 id: 283
            //             }, {
            //                 name: "min",
            //                 id: 283
            //             }, {
            //                 name: "mod",
            //                 id: 591
            //             }, {
            //                 name: "mul",
            //                 id: 603
            //             }, {
            //                 name: "neq",
            //                 id: 599
            //             }, {
            //                 name: "not",
            //                 id: 386
            //             }, {
            //                 name: "or",
            //                 id: 323
            //             }, {
            //                 name: "orderby",
            //                 id: 307
            //             }, {
            //                 name: "range",
            //                 id: 772
            //             }, {
            //                 name: "select",
            //                 id: 296
            //             }, {
            //                 name: "stddev",
            //                 id: 363
            //             }, {
            //                 name: "sub",
            //                 id: 600
            //             }, {
            //                 name: "sum",
            //                 id: 280
            //             }, {
            //                 name: "update",
            //                 id: 307
            //             }, {
            //                 name: "variance",
            //                 id: 335
            //             }, {
            //                 name: "where",
            //                 id: 299
            //             }, {
            //                 name: "xor",
            //                 id: 354
            //             }, {
            //                 name: "_",
            //                 id: 264
            //             }]
            //         }, {
            //             name: "Minimum",
            //             id: 843
            //         }, {
            //             name: "Not",
            //             id: 1554
            //         }, {
            //             name: "Or",
            //             id: 970
            //         }, {
            //             name: "Query",
            //             id: 13896
            //         }, {
            //             name: "Range",
            //             id: 1594
            //         }, {
            //             name: "StringUtil",
            //             id: 4130
            //         }, {
            //             name: "Sum",
            //             id: 791
            //         }, {
            //             name: "Variable",
            //             id: 1124
            //         }, {
            //             name: "Variance",
            //             id: 1876
            //         }, {
            //             name: "Xor",
            //             id: 1101
            //         }]
            //     }, {
            //         name: "scale",
            //         children: [{
            //             name: "IScaleMap",
            //             id: 2105
            //         }, {
            //             name: "LinearScale",
            //             id: 1316
            //         }, {
            //             name: "LogScale",
            //             id: 3151
            //         }, {
            //             name: "OrdinalScale",
            //             id: 3770
            //         }, {
            //             name: "QuantileScale",
            //             id: 2435
            //         }, {
            //             name: "QuantitativeScale",
            //             id: 4839
            //         }, {
            //             name: "RootScale",
            //             id: 1756
            //         }, {
            //             name: "Scale",
            //             id: 4268
            //         }, {
            //             name: "ScaleType",
            //             id: 1821
            //         }, {
            //             name: "TimeScale",
            //             id: 5833
            //         }]
            //     }, {
            //         name: "util",
            //         children: [{
            //             name: "Arrays",
            //             id: 8258
            //         }, {
            //             name: "Colors",
            //             id: 10001
            //         }, {
            //             name: "Dates",
            //             id: 8217
            //         }, {
            //             name: "Displays",
            //             id: 12555
            //         }, {
            //             name: "Filter",
            //             id: 2324
            //         }, {
            //             name: "Geometry",
            //             id: 10993
            //         }, {
            //             name: "heap",
            //             children: [{
            //                 name: "FibonacciHeap",
            //                 id: 9354
            //             }, {
            //                 name: "HeapNode",
            //                 id: 1233
            //             }]
            //         }, {
            //             name: "IEvaluable",
            //             id: 335
            //         }, {
            //             name: "IPredicate",
            //             id: 383
            //         }, {
            //             name: "IValueProxy",
            //             id: 874
            //         }, {
            //             name: "math",
            //             children: [{
            //                 name: "DenseMatrix",
            //                 id: 3165
            //             }, {
            //                 name: "IMatrix",
            //                 id: 2815
            //             }, {
            //                 name: "SparseMatrix",
            //                 id: 3366
            //             }]
            //         }, {
            //             name: "Maths",
            //             id: 17705
            //         }, {
            //             name: "Orientation",
            //             id: 1486
            //         }, {
            //             name: "palette",
            //             children: [{
            //                 name: "ColorPalette",
            //                 id: 6367
            //             }, {
            //                 name: "Palette",
            //                 id: 1229
            //             }, {
            //                 name: "ShapePalette",
            //                 id: 2059
            //             }, {
            //                 name: "SizePalette",
            //                 id: 2291
            //             }]
            //         }, {
            //             name: "Property",
            //             id: 5559
            //         }, {
            //             name: "Shapes",
            //             id: 19118
            //         }, {
            //             name: "Sort",
            //             id: 6887
            //         }, {
            //             name: "Stats",
            //             id: 6557
            //         }, {
            //             name: "Strings",
            //             id: 22026
            //         }]
            //     }, {
            //         name: "vis",
            //         children: [{
            //             name: "axis",
            //             children: [{
            //                 name: "Axes",
            //                 id: 1302
            //             }, {
            //                 name: "Axis",
            //                 id: 24593
            //             }, {
            //                 name: "AxisGridLine",
            //                 id: 652
            //             }, {
            //                 name: "AxisLabel",
            //                 id: 636
            //             }, {
            //                 name: "CartesianAxes",
            //                 id: 6703
            //             }]
            //         }, {
            //             name: "controls",
            //             children: [{
            //                 name: "AnchorControl",
            //                 id: 2138
            //             }, {
            //                 name: "ClickControl",
            //                 id: 3824
            //             }, {
            //                 name: "Control",
            //                 id: 1353
            //             }, {
            //                 name: "ControlList",
            //                 id: 4665
            //             }, {
            //                 name: "DragControl",
            //                 id: 2649
            //             }, {
            //                 name: "ExpandControl",
            //                 id: 2832
            //             }, {
            //                 name: "HoverControl",
            //                 id: 4896
            //             }, {
            //                 name: "IControl",
            //                 id: 763
            //             }, {
            //                 name: "PanZoomControl",
            //                 id: 5222
            //             }, {
            //                 name: "SelectionControl",
            //                 id: 7862
            //             }, {
            //                 name: "TooltipControl",
            //                 id: 8435
            //             }]
            //         }, {
            //             name: "data1",
            //             children: [{
            //                 name: "Data",
            //                 id: 20544
            //             }, {
            //                 name: "DataList",
            //                 id: 19788
            //             }, {
            //                 name: "DataSprite",
            //                 id: 10349
            //             }, {
            //                 name: "EdgeSprite",
            //                 id: 3301
            //             }, {
            //                 name: "NodeSprite",
            //                 id: 19382
            //             }, {
            //                 name: "render",
            //                 children: [{
            //                     name: "ArrowType",
            //                     id: 698
            //                 }, {
            //                     name: "EdgeRenderer",
            //                     id: 5569
            //                 }, {
            //                     name: "IRenderer",
            //                     id: 353
            //                 }, {
            //                     name: "ShapeRenderer",
            //                     id: 2247
            //                 }]
            //             }, {
            //                 name: "ScaleBinding",
            //                 id: 11275
            //             }, {
            //                 name: "Tree",
            //                 id: 7147
            //             }, {
            //                 name: "TreeBuilder",
            //                 id: 9930
            //             }]
            //         }, {
            //             name: "events",
            //             children: [{
            //                 name: "DataEvent",
            //                 id: 2313
            //             }, {
            //                 name: "SelectionEvent",
            //                 id: 1880
            //             }, {
            //                 name: "TooltipEvent",
            //                 id: 1701
            //             }, {
            //                 name: "VisualizationEvent",
            //                 id: 1117
            //             }]
            //         }, {
            //             name: "legend",
            //             children: [{
            //                 name: "Legend",
            //                 id: 20859
            //             }, {
            //                 name: "LegendItem",
            //                 id: 4614
            //             }, {
            //                 name: "LegendRange",
            //                 id: 10530
            //             }]
            //         }, {
            //             name: "operator",
            //             children: [{
            //                 name: "distortion",
            //                 children: [{
            //                     name: "BifocalDistortion",
            //                     id: 4461
            //                 }, {
            //                     name: "Distortion",
            //                     id: 6314
            //                 }, {
            //                     name: "FisheyeDistortion",
            //                     id: 3444
            //                 }]
            //             }, {
            //                 name: "encoder",
            //                 children: [{
            //                     name: "ColorEncoder",
            //                     id: 3179
            //                 }, {
            //                     name: "Encoder",
            //                     id: 4060
            //                 }, {
            //                     name: "PropertyEncoder",
            //                     id: 4138
            //                 }, {
            //                     name: "ShapeEncoder",
            //                     id: 1690
            //                 }, {
            //                     name: "SizeEncoder",
            //                     id: 1830
            //                 }]
            //             }, {
            //                 name: "filter",
            //                 children: [{
            //                     name: "FisheyeTreeFilter",
            //                     id: 5219
            //                 }, {
            //                     name: "GraphDistanceFilter",
            //                     id: 3165
            //                 }, {
            //                     name: "VisibilityFilter",
            //                     id: 3509
            //                 }]
            //             }, {
            //                 name: "IOperator",
            //                 id: 1286
            //             }, {
            //                 name: "label",
            //                 children: [{
            //                     name: "Labeler",
            //                     id: 9956
            //                 }, {
            //                     name: "RadialLabeler",
            //                     id: 3899
            //                 }, {
            //                     name: "StackedAreaLabeler",
            //                     id: 3202
            //                 }]
            //             }, {
            //                 name: "layout",
            //                 children: [{
            //                     name: "AxisLayout",
            //                     id: 6725
            //                 }, {
            //                     name: "BundledEdgeRouter",
            //                     id: 3727
            //                 }, {
            //                     name: "CircleLayout",
            //                     id: 9317
            //                 }, {
            //                     name: "CirclePackingLayout",
            //                     id: 12003
            //                 }, {
            //                     name: "DendrogramLayout",
            //                     id: 4853
            //                 }, {
            //                     name: "ForceDirectedLayout",
            //                     id: 8411
            //                 }, {
            //                     name: "IcicleTreeLayout",
            //                     id: 4864
            //                 }, {
            //                     name: "IndentedTreeLayout",
            //                     id: 3174
            //                 }, {
            //                     name: "Layout",
            //                     id: 7881
            //                 }, {
            //                     name: "NodeLinkTreeLayout",
            //                     id: 12870
            //                 }, {
            //                     name: "PieLayout",
            //                     id: 2728
            //                 }, {
            //                     name: "RadialTreeLayout",
            //                     id: 12348
            //                 }, {
            //                     name: "RandomLayout",
            //                     id: 870
            //                 }, {
            //                     name: "StackedAreaLayout",
            //                     id: 9121
            //                 }, {
            //                     name: "TreeMapLayout",
            //                     id: 9191
            //                 }]
            //             }, {
            //                 name: "Operator",
            //                 id: 2490
            //             }, {
            //                 name: "OperatorList",
            //                 id: 5248
            //             }, {
            //                 name: "OperatorSequence",
            //                 id: 4190
            //             }, {
            //                 name: "OperatorSwitch",
            //                 id: 2581
            //             }, {
            //                 name: "SortOperator",
            //                 id: 2023
            //             }]
            //         }, {
            //             name: "Visualization",
            //             id: 16540
            //         }]
            //     }]
            // },
            route: "signIn",
            data: {
                name: 'blah',
                children: []
            },
            clicked: false,
            height: 2500,
            node: null,
            width: 1200,
            messageList: [{
                author: 'them',
                type: 'text',
                data: { text: 'flare' }
            }, {
                author: 'them',
                type: 'text',
                data: { text: 'abracadabre' }
            }, {
                author: 'them',
                type: 'text',
                data: { text: 'bsioflf' }
            }]
        };
        this.onHandleClose = this.onHandleClose.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        axios.get('http://35.154.175.45/user/myntra')
            .then(response => {
                this.setState({
                    data: response.data
                })
            })
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }
    onClick = (event, nodeKey) => {
        // onCLICK
        // console.log(nodeKey);
        // const nodeObject;
        // let data;
        axios.post('http://35.154.175.45/project/get-child-by-name', {
            childName: nodeKey
        }).then(response => {
            console.log(response)
            this.setState({
                clicked: true,
                node: response.data
            })
        })

    };
    onHandleClose = () => {
        this.setState({ clicked: false })
    }
    onRouteChange = route => {
        this.setState({ route: route });
    };

    _onMessageWasSent(message) {
        console.log(message);
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }
    onRouteChange = route => {
        this.setState({ route: route });
    };
    render() {
        const { route, height, width } = this.state;
        // console.log('state', this.state);
        // switch (this.state.route) {
        //     case "signIn":
        //         return (
        //             <div className="App">
        //                 <NavBar route={route} onRouteChange={this.onRouteChange} />
        //                 <SignIn onRouteChange={this.onRouteChange} />
        //             </div>
        //         );
        //     case "register":
        //         return (
        //             <div className="App">
        //                 <NavBar route={route} onRouteChange={this.onRouteChange} />
        //                 <Register onRouteChange={this.onRouteChange} />
        //             </div>
        //         )
        //     case "home":
        return (
            <div className="App">
                <NavBar route={route} onRouteChange={this.onRouteChange} />
                <div className="custom-container">
                    <Tree
                        data={this.state.data}
                        height={height}
                        width={width / 2}
                        gProps={{
                            className: 'white-text',
                            onClick: this.onClick
                        }}
                        svgProps={{
                            className: 'custom'
                        }}
                        animated />
                </div>
                <Launcher
                    agentProfile={{
                        teamName: 'SaaSY chat   ',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messageList}
                />
                {this.state.clicked ? <Popup data={this.state.node} modal={this.state.clicked} onModalClose={this.onHandleClose} /> : null}
            </div>
        );
        //     default:
        //         break;
        // }
    }
}

export default App;
