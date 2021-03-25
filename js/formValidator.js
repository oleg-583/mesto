// export 
const validateClasses = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inputErrorClass: ".popup__input-error",
    errorClass: "popup__input-error_active",
};

class FormValidator {
    constructor(settings, form) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = form;
    }

    //функция отображения сообщения о неправильно введенных данных

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);

        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    //функция скрытия сообщения о неправильно введенных данных
    _hideInputError = (inputElement) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);

        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    };

    ///функция валидации инпута 
    _checkInputValidity = (inputElement) => {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;

            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    //функция управления активностью кнопки
    _toggleButtonState = () => {
        const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
        const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid);

        if (hasNotValidInput) {
            this._buttonElement.setAttribute("disabled", true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    //функция установки слушателей на все поля
    _setEventListeners = () => {
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);

        const inputListIterator = (inputElement) => {
            const handleInput = () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            };

            inputElement.addEventListener("input", handleInput);
        };

        this._inputList.forEach(inputListIterator);
        this._toggleButtonState(this._inputList, this._buttonElement);
    };

    //функция проверки валидности
    enableValidation() {
        this._setEventListeners();
    };

    clearValidation() {
        this._inputList.forEach(this._hideInputError);
        this._toggleButtonState();
    }
}

export { validateClasses, FormValidator }