import React, { useContext, useEffect } from "react";

import { Navigation } from "./components";
import { AuthContext } from "./context/AuthProvider";
import Routes from "./routes";
import { validate_token } from "./utils/jwt";

function App() {
  const { setAuthenticatedStatus } = useContext(AuthContext);

  // Check if auth token is valid
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      if (validate_token()) {
        setAuthenticatedStatus(true);
      } else {
        setAuthenticatedStatus(false);
        localStorage.removeItem("token");
      }
    }
  }, [setAuthenticatedStatus]);

  return (
    <div>
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
