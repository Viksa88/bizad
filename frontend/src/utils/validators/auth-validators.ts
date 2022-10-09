const isValidEmail = (email: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

const isValidPassword = (password: string) => {
  return password.length >= 6;
};

const isValidName = (password: string) => {
  return password.length >= 2;
};

export { isValidEmail, isValidPassword, isValidName };
