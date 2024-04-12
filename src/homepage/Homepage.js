import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage hero-home">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Traveler</h1>
          <p className="lead"> Share the world with others. </p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
              <p>
                Photo by 
                <a href="https://unsplash.com/@spencerdavis?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                   Spencer Davis
                  </a> on <a href="https://unsplash.com/photos/person-walking-near-the-great-sphinx-ONVA6s03hg8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash</a>
              </p>
        </div>
      </div>
  );
}

export default Homepage;
