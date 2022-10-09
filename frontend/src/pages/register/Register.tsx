import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Input } from "../../components";
import { axiosclient } from "../../lib/api";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../utils/validators";

const initalError = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userError, setUserError] = useState(initalError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserError(initalError);

    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateRegisterInputs = () => {
    let isValid = true;

    if (!isValidName(user.name)) {
      isValid = false;
      setUserError((prevState) => {
        return {
          ...prevState,
          name: "Name should contain atlease 2 characters",
        };
      });
    }

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
          password: "Password should contain at least 6 characters",
        };
      });
    }

    if (!(user.password === user.confirmPassword)) {
      isValid = false;
      setUserError((prevState) => {
        return {
          ...prevState,
          password: "Password and confirm password should be same",
        };
      });
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateRegisterInputs()) {
      setLoading(false);
      return;
    }

    await axiosclient
      .post("/api/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <div className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="w-25 d-flex flex-column gap-2">
        <h2 className="text-center"> Sign Up </h2>

        {error.length > 0 && <Alert variant="alert-danger" message={error} />}

        <Input
          value={user.name}
          name="name"
          placeholder="Name"
          type="text"
          onChange={handleChange}
          error={userError.name}
        />

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

        <Input
          value={user.confirmPassword}
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
          error={userError.password}
        />

        <Button
          isLoading={loading}
          title="Register"
          type="submit"
          variant="btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
