export const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
};

export const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
};

export const checkInputValidity = (formElement, inputElement, params) => {
    if (inputElement.validity.patternMismatch) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage, params);
    } else if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

export const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid || inputElement.validity.patternMismatch;
    });
};

export const toggleButtonState = (inputList, buttonElement, params) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, params);
    } else {
        enableSubmitButton(buttonElement, params);
    }
};

export function enableValidation(params) {
    const formElements = Array.from(document.querySelectorAll(params.formSelector));

    formElements.forEach(formElement => {
        formElement.addEventListener('submit', evt => evt.preventDefault());

        const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
        const buttonElement = formElement.querySelector(params.submitButtonSelector);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement, params);
                toggleButtonState(inputList, buttonElement, params);
            });
        });

        toggleButtonState(inputList, buttonElement, params);
    });
}

export function clearValidation(formElement, params) {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, params);
    });

    toggleButtonState(inputList, buttonElement, params);
}
const disableSubmitButton = (buttonElement, config) => {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
};

const enableSubmitButton = (buttonElement, config) => {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
};
