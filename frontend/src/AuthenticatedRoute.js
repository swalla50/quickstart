import React from "react";
import { Route, Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ element: Component, ...rest }) => {
  //converts object to boolean ->false if null else true//
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("AUTH",isAuthenticated)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default React.memo(AuthenticatedRoute);