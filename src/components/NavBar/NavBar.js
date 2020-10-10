import React from 'react';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a href="!#" className="navbar-brand">iCrowdTask</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="navbar-nav">
          <a href="!#" className="nav-link">
            How it works
          </a>∂

          <a className="nav-link" href="/requester-page">
            Requesters
          </a>

          <a className="nav-link" href="/worker-page">
            Workers
          </a>
          <a href="!#" className="nav-link" >
            Pricing
          </a>
          <a href="!#" className="nav-link">
            About
          </a>
        </div>
      </div>
      <div>
        <button className="btn btn-sm btn-success">Sign in</button>
      </div>
    </nav>
  );
}

export default NavBar;
