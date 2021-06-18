// main component that will call other component jsx files

"use strict";

function App() {
    return (
        <React.Fragment>
        <div className="App">
            <ReactRouterDOM.Route exact path = "/">
                <Homepage />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path = "/api/search">
                <Search />
            </ReactRouterDOM.Route>
        </div>
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));
