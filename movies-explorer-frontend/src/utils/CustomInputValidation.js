import {
  passwordInputRegexp,
  symbolsRegexp,
  nameInputRegexp,
  validationMessages,
  emailRegexp,
} from "./constants";

export const isName = (string) => {
  const name = String(string).toLowerCase();
  const haveSymbols = symbolsRegexp.test(name);
  const singleMatch = name.match(nameInputRegexp);
  return !singleMatch || singleMatch.length > 1 || haveSymbols
    ? validationMessages.name
    : "";
};

export const isPassword = (string) => {
  const password = String(string).toLowerCase();
  const haveSymbols = symbolsRegexp.test(password);
  const singleMatch = password.match(passwordInputRegexp).length;
  return singleMatch > 1 || haveSymbols ? validationMessages.password : "";
};

export const isEmail = (email) => {
  return !emailRegexp.test(email) ? validationMessages.email : "";
};
