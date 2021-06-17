//have homepage and search feature in separate jsx files
// create homepage after search feature
// add nav bar, and other homepage things

"use strict";


function Homepage(props) {
    return (
      <div id="home-banner" className="row">
        <h1>Search for a rooftop bar!</h1>
      </div>
    );
  }

  ReactDOM.render(<Homepage />, document.querySelector("#root"));
