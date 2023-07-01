import {
  PASSWORD_INPUT_REGEXP,
  SYMBOLS_REGEXP,
  NAME_INPUT_REGEXP,
  VALIDATION_MESSAGES,
  EMAIL_REGEXP,
} from "./constants";

export const isName = (string) => {
  const name = String(string).toLowerCase();
  const haveSymbols = SYMBOLS_REGEXP.test(name);
  const singleMatch = name.match(NAME_INPUT_REGEXP);
  return !singleMatch || singleMatch.length > 1 || haveSymbols
    ? VALIDATION_MESSAGES.name
    : "";
};

export const isPassword = (string) => {
  const password = String(string).toLowerCase();
  const haveSymbols = SYMBOLS_REGEXP.test(password);
  const singleMatch = password.match(PASSWORD_INPUT_REGEXP).length;
  return singleMatch > 1 || haveSymbols ? VALIDATION_MESSAGES.password : "";
};

export const isEmail = (email) => {
  return !EMAIL_REGEXP.test(email) ? VALIDATION_MESSAGES.email : "";
};
