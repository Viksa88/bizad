import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Input } from "../../components";
import { AuthContext } from "../../context/AuthProvider";
import { axiosclient } from "../../lib/api";
import { isValidEmail, isValidPassword } from "../../utils/validators";

const initalError = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { setAuthenticatedStatus } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState(initalError);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserError(initalError);

    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateLoginInputs = () => {
    let isValid = true;

    if (!isValidEmail(user.email)) {
      isValid = false;
      setUserError((prevState) => {
        return {
          ...prevState,
          email: "Please enter a valid email",
        };
      });
    }

    if (!isValidPassword(user.password)) {
      isValid = false;
      setUserError((prevState) => {
        return {
          ...prevState,
          password: "Password should contain atleast 6 characters",
        };
      });
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateLoginInputs()) {
      setLoading(false);
      return;
    }

    await axiosclient
      .post("/api/auth/login", user)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.access);
          setAuthenticatedStatus(true);
          navigate("/");
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });

    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="w-25 d-flex flex-column gap-2">
        <h2 className="text-center"> Login </h2>

        {error.length > 0 && <Alert variant="alert-danger" message={error} />}

        <Input
          value={user.email}
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          error={userError.email}
        />

        <Input
          value={user.password}
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          error={userError.password}
        />

        <Button
          isLoading={loading}
          title="Login"
          type="submit"
          variant="btn-primary"
        />
      </form>
    </div>
  );
};

export default Login;
