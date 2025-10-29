const pattern = /^[A-Za-zА-Яа-яЁё\s\-,]*$/;

const shouldCheckPattern = (inputElement) => {
    return inputElement.dataset.validatePattern === "true";
};

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
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else if (shouldCheckPattern(inputElement) && !pattern.test(inputElement.value)) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

export const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid || (shouldCheckPattern(inputElement) && !pattern.test(inputElement.value));
    });
};

export const toggleButtonState = (inputList, buttonElement, params) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(params.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass);
        buttonElement.disabled = false;
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
