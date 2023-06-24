export const MOVIES_API_ADRESS = "https://api.nomoreparties.co/beatfilm-movies";
export const BACKEND_API_ADRESS =
  "https://front.diploma.nomoredomains.monster/api";
export const SHORT_DUR_MOOVIE_MIN = 40;
export const SW_1280 = 1280;
export const SW_768 = 768;
export const SW_480 = 480;
export const MIDDLE_MOOVIES_COUNT = 8;
export const SMALL_MOOVIES_COUNT = 5;
export const BIG_MOOVIES_COUNT = 16;
export const TWO_MOOVIES_IN_COLUMN = 2;
export const FOUR_MOOVIES_IN_COLUMN = 4;
export const ONE_MOOVIES_IN_COLUMN = 1;
export const DEFAULT_ERR_MESSAGE =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const NOTHING_FOUND = "Ничего не найдено";
//
// Константы для валидации форм
//
export const PASSWORD_INPUT_REGEXP = /[0-9a-z-а-яё]+/g;
export const SYMBOLS_REGEXP = /[_~!@#$%^&*()\[\]+`'";:<>\/\\|=]/g;
export const NAME_INPUT_REGEXP = /[a-z-. а-яё]+/g;
export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const VALIDATION_MESSAGES = {
  name: "Имя содержит недопустимые символы",
  email: "Неккоректный формат email",
  password: "Пароль содержит не допустимые символы.",
};

export const SERVER_VALIDATION_MESSAGES = {
  400: "Неккоректные данные.",
  401: "Не авторизован.",
  409: "Пользователь с введенным email уже зарегистрирован.",
  500: "Ошибка на сервере.",
};
