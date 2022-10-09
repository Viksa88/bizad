import jwt_decode, { JwtPayload } from "jwt-decode";

const validate_token = () => {
  let token = localStorage.getItem("token");

  if (token != null) {
    const decodedToken = jwt_decode<JwtPayload>(token);
    let currentDate = new Date();

    if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export { validate_token };
