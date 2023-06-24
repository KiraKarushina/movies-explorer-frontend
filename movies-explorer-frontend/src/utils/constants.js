export const moviesApiAddress = "https://api.nomoreparties.co/beatfilm-movies";
export const backendApiAddress =
  "https://front.diploma.nomoredomains.monster/api";
export const shortDurMoovieMin = 40;
export const sw1280 = 1280;
export const sw768 = 768;
export const sw480 = 480;
export const middleMooviesCount = 8;
export const smallMooviesCount = 5;
export const bigMooviesCount = 16;
export const twoMovieInColumn = 2;
export const fourMovieInColumn = 4;
export const oneMoovieInColumn = 1;
export const default_err_message =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const nothing_found = "Ничего не найдено";
//
// Константы для валидации форм
//
export const passwordInputRegexp = /[0-9a-z-а-яё]+/g;
export const symbolsRegexp = /[_~!@#$%^&*()\[\]+`'";:<>\/\\|=]/g;
export const nameInputRegexp = /[a-z-. а-яё]+/g;
export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validationMessages = {
  name: "Имя содержит недопустимые символы",
  email: "Неккоректный формат email",
  password: "Пароль содержит не допустимые символы.",
};

export const serverValidationMessages = {
  400: "Неккоректные данные.",
  401: "Не авторизован.",
  409: "Пользователь с введенным email уже зарегистрирован.",
  500: "Ошибка на сервере.",
};
