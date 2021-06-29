// add nav bar, and other homepage things

"use strict";

function Homepage(props) {
    return (
      <div id="home-banner" className="row">
        <div className="col">
          <h1>Rooftop Bar Locator!</h1>
          <Search />
        </div>
      </div>
    );
  }

function Navbar(props) {
  const { logo, brand } = props;

  return (
    <nav>
      <ReactRouterDOM.Link
        to="/"
        className="navbar-brand d-flex justify-content-center"
      >
        <img src={logo} height="30" />
        <span>{brand}</span>
      </ReactRouterDOM.Link>

      <section className="d-flex justify-content-end">
        <ReactRouterDOM.NavLink
          to="/map"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Map
        </ReactRouterDOM.NavLink>
      </section>
    </nav>
  );
}