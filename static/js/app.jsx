// Main component that will call other component jsx files

"use strict";

function App() {
    return (
        <ReactRouterDOM.BrowserRouter>
            {/* <Navbar logo="/static/img/placeholder.png" brand="PLACEHOLDER"/> */}
            <div className="container-fluid">
                <ReactRouterDOM.Route exact path = "/">
                    <Homepage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path = "/search">
                    <Search />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path = "/map">
                    <MapComponent />
                </ReactRouterDOM.Route>
            </div>
        </ReactRouterDOM.BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));
