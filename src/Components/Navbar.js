import React from "react";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">
            MANAWER
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              {
                !localStorage.getItem('currentUser') &&
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="login">
                  Login
                </a>
              </li>
              }
              {
                !localStorage.getItem('currentUser') &&
                <li class="nav-item">
                <a class="nav-link" href="register">
                  Register
                </a>
              </li>
              }
              
              {
                localStorage.getItem('currentUser') &&
              <li class="nav-item">
                <a class="nav-link" href="/profile">
                  Profile
                </a>
                
              </li>
}
              {
                localStorage.getItem('currentUser') &&
                <li class="nav-item">
                <a class="nav-link" onClick={() => {localStorage.clear(); window.location.href='/login'}}>
                  Logout
                </a>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
