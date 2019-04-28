# SAASY by Bubblegum

The `src` directory contains all the components and containers used in the react app.

## Components
Several of the component snippets have been taken from the [reactstrap](https://reactstrap.github.io/) library directly. 

### InputBar
A standard input bar that renders a bootstrapped component with inputs as `placeholder` and `onInputChange` as __props__. It is used in the `Modal` component. Look at the code [here](src/components/InputBar).

### Lists
A standard ListGroup that renders dynamic list of objects as a component with inputs as `children` as inputs. It is used in the `Modal` component. Look at the code [here](src/components/Lists).

The children props must be a list objects with `_id` and `name` as fields or attributes.

### Login
A standard login form with email and password fields with validation in firebase which has been initialised in [firebase.js](src/containers/Firebase/). It takes `onRoutChange` as props which is used for navigating to the Home Page. It is used in the `App` container. Look at the code [here](src/components/Login).

### Navbar
A standard navbar that renders a bootstrapped component with __props__ as `route` and `onRouteChange`. With a `switch` case the navbar component renders certain nav components based on the `route` value that is passed from `App`. `navbar.css` will be used to style the navbar although it doesn't do anythig right now.

## Containers
Containers contains the collated components that are you using one or more components in it. Firebase auth is also saved as a container.

### Modal

A popup modal that renders when a particular node of the tree is clicked. It is used to add/delete children of the concerned node. It takes `tree`, `data`, `onHandleClose` and `reflectModalChanges` as __props__. It is used in the `App` container. Look at the code [here](src/components/Modal).