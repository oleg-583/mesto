const validateClasses = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inputErrorClass: ".popup__input-error",
    errorClass: "popup__input-error_active",
};

//функция отображения сообщения о неправильно введенных данных
const showInputError = (inputElement, errorMessage, { errorClass }) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//функция скрытия сообщения о неправильно введенных данных
const hideInputError = (inputElement, { errorClass }) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
};

///функция валидации инпута 
const checkInputValidity = (inputElement, configValidate) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorMessage, configValidate);
    } else {
        hideInputError(inputElement, configValidate);
    }
};

//функция управления активностью кнопки
const toggleButtonState = (
    inputList,
    buttonElement,
) => {
    const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.removeAttribute("disabled");
    }
};

//функция установки слушателей на все поля
const setEventListeners = (formElement, configValidate) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);

    const { inputSelector, submitButtonSelector } = configValidate;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
        const handleInput = () => {
            checkInputValidity(inputElement, configValidate);
            toggleButtonState(inputList, buttonElement, configValidate);
        };

        inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(inputListIterator);
    toggleButtonState(inputList, buttonElement, configValidate);
};

////функция проверки валидности
const enableValidation = (configValidate) => {
    const { formSelector } = configValidate;
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);

    formList.forEach((formElement) => {
        setEventListeners(formElement, configValidate);
    });
};

enableValidation(validateClasses);