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

    //функция не верной валидации 
    _hasNotValidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    //функция управления активностью кнопки
    _toggleButtonState = () => {
        if (this._hasNotValidInput()) {
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

export { FormValidator }