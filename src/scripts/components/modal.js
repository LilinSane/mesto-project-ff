//Закрытие модального окна и удаление обработчиков закрытия
export function closePopup(popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', popup._handleEscClose);
    popup.removeEventListener('click', popup._handleOverlayClose);
    popup.querySelector(".popup__close").removeEventListener('click', popup._handleButtonClose);
}

//Открытие модального окна и добавление обработчиков закрытия
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    // Закрытие при нажатии на ESC
    popup._handleEscClose = (e) => {
        if (e.key === 'Escape') {
            closePopup(popup);
        }
    };

    //Закрытие при нажатии по оверлею
    popup._handleOverlayClose = (e) => {
        if (e.target === e.currentTarget) {
            closePopup(popup);
        }
    };

    //Закрытие при нажатии на кнопку
    popup._handleButtonClose = () => {
        closePopup(popup);
    };

    document.addEventListener('keydown', popup._handleEscClose);
    popup.addEventListener('click', popup._handleOverlayClose);
    popup.querySelector(".popup__close").addEventListener('click', popup._handleButtonClose);
}
