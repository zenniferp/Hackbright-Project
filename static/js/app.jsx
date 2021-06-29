// main component that will call other component jsx files

"use strict";

function App() {
    return (
        <ReactRouterDOM.BrowserRouter>
            {/* <Navbar logo="/static/img/watermelon.png" brand="Ubermelon"/> */}
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
