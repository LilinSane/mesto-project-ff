import '../pages/index.css';
import './components/cards';
import './components/card'
import {initialCards} from "./components/cards";
import {closePopup, openPopup} from "./components/modal";
import {createCardElement, handleDeleteCard, handleLikeCard} from "./components/card";

export const placesWrap = document.querySelector(".places__list");
document.querySelector('.places__list');
document.querySelector('.places__list');
initialCards.forEach((data) => {
    placesWrap.append(createCardElement(data, handleDeleteCard, handleLikeCard, handlePopupImage));
});

const profileModal = document.querySelector('.popup_type_edit');
const profileButtonOpen = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];

const cardModal = document.querySelector('.popup_type_new-card');
const buttonOpen = document.querySelector('.profile__add-button');
const cardForm = document.forms['new-place'];

const cardViewModal = document.querySelector('.popup_type_image');

//Обработка отправки формы редактирования профиля
function handleProfileFormSubmit(e){
    e.preventDefault();
    document.querySelector('.profile__title').textContent = profileForm.name.value;
    document.querySelector('.profile__description').textContent = profileForm.description.value;
    closePopup(profileModal);
}

//Обработка отправки формы создания карточки
function handleCardFormSubmit(e){
    e.preventDefault();
    placesWrap.prepend(createCardElement({
        name: cardForm['place-name'].value,
        link: cardForm.link.value,
    }, handleDeleteCard, handleLikeCard, handlePopupImage   ));
    closePopup(cardModal);
}

//Обработчик открытия модального окна картинки
function handlePopupImage(e) {
    if (e.target.classList.contains('card__image')) {
        const cardElement = e.target.closest('.card');
        const cardTitle = cardElement.querySelector('.card__title');
        const popupImage = document.querySelector('.popup__image');

        popupImage.src = e.target.src;
        popupImage.alt = e.target.alt;
        document.querySelector('.popup__caption').textContent = cardTitle.textContent;

        openPopup(cardViewModal);
    }
}

profileButtonOpen.addEventListener('click', () => {
    profileForm.name.value = document.querySelector('.profile__title').textContent;
    profileForm.description.value = document.querySelector('.profile__description').textContent;
    openPopup(profileModal);
})

profileForm.addEventListener('submit', handleProfileFormSubmit);

buttonOpen.addEventListener('click', () => {
    cardForm['place-name'].value = '';
    cardForm.link.value = '';
    openPopup(cardModal);
})

cardForm.addEventListener('submit', handleCardFormSubmit);