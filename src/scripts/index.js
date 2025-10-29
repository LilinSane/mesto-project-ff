import '../pages/index.css';
import './components/card'
import {closePopup, openPopup} from "./components/modal";
import {createCardElement, handleDeleteCard, handleLikeCard} from "./components/card";
import {clearValidation, enableValidation} from "./components/validation";
import {
    addNewCard,
    getInitialCards,
    getInitialProfile,
    updateProfileData,
    updateProfileImage
} from "./components/api";

export const placesWrap = document.querySelector(".places__list");


const profileModal = document.querySelector('.popup_type_edit');
const profileButtonOpen = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];

const cardModal = document.querySelector('.popup_type_new-card');
const cardButtonOpen = document.querySelector('.profile__add-button');
const cardForm = document.forms['new-place'];

const profileImageModal = document.querySelector('.popup_type_edit-profile-image');
const profileImageButtonOpen = document.querySelector('.profile__image');
const profileImageForm = document.forms['edit-profile-image'];

const confirmDeleteModal = document.querySelector('.popup_type_confirm_delete');
const confirmDeleteButton = confirmDeleteModal.querySelector('.popup__button');

const cardViewModal = document.querySelector('.popup_type_image');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let currentUserId;

//Обработка отправки формы редактирования профиля
function handleProfileFormSubmit(e){
    e.preventDefault();
    renderLoading(profileForm, 'Сохранение...');
    updateProfileData(profileForm.name.value, profileForm.description.value)
        .then(profileData => {
            renderProfileData(profileData);
            closePopup(profileModal);
        })
        .catch(reportError => console.log(reportError))
        .finally(() => {
            renderLoading(profileImageForm, 'Сохранить');
        });
}

//Обработка отправки формы создания карточки
function handleCardFormSubmit(e){
    e.preventDefault();
    renderLoading(cardForm, 'Сохранение...');
    addNewCard(cardForm['place-name'].value, cardForm.link.value)
        .then(card => {
            renderNewCard(card);
            closePopup(cardModal);
        })
        .catch(reportError => console.log(reportError))
        .finally(() => {
            renderLoading(cardForm, 'Сохранить');
        });
}

//Обработка отправки формы смены фото профиля
function handleProfileImageFormSubmit(e){
    e.preventDefault();
    renderLoading(profileImageForm, 'Сохранение...');
    updateProfileImage(profileImageForm.link.value)
        .then(profileData => {
            renderProfileData(profileData);
            closePopup(profileImageModal);
        })
        .catch(reportError => console.log(reportError))
        .finally(() => {
            renderLoading(profileImageForm, 'Сохранить')
        });
}

//Обработчик удаления карточки с подтверждением в модальном окне
function handleConfirmDeleteSubmit(cardElement, cardId){
    openPopup(confirmDeleteModal);

    const onConfirmClick = () => {
        handleDeleteCard(cardElement, cardId);
        closePopup(confirmDeleteModal);
        confirmDeleteButton.removeEventListener('click', onConfirmClick);
    };

    confirmDeleteButton.addEventListener('click', onConfirmClick);
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

function renderLoading(popupForm, statusText){
    const popupButton = popupForm.querySelector('.popup__button');
    popupButton.textContent = statusText;
}

//Отрисовка данных профиля
function renderProfileData(profileData){
    const profileElement = document.querySelector('.profile');
    const profileTitle = profileElement.querySelector('.profile__title');
    const profileDescription = profileElement.querySelector('.profile__description');
    const profileImage = profileElement.querySelector('.profile__image');
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url("${profileData.avatar || '../../../images/avatar.jpg'}")`;
}

//Отрисовка данных карточек
function renderCardsData(initialCards){
    initialCards.forEach((card) => {
        placesWrap.append(createCardElement(
            {
                card,
                currentUserId,
                onDelete: handleConfirmDeleteSubmit,
                onLike: handleLikeCard,
                onPopupImage: handlePopupImage
            }
        ));
    });
}

//Отрисовка новой карточки без перерисовки старых
function renderNewCard(card){
    placesWrap.prepend(createCardElement(
        {
            card,
            currentUserId,
            onDelete: handleConfirmDeleteSubmit,
            onLike: handleLikeCard,
            onPopupImage: handlePopupImage
        }
    ));
}

//Получение данных при инициализации
Promise.all([getInitialProfile(), getInitialCards()])
    .then(([profileData, initialCards]) => {
        currentUserId = profileData._id;
        renderProfileData(profileData);
        renderCardsData(initialCards);
    })
    .catch(reportError => console.log(reportError));

profileButtonOpen.addEventListener('click', () => {
    profileForm.name.value = document.querySelector('.profile__title').textContent;
    profileForm.description.value = document.querySelector('.profile__description').textContent;
    clearValidation(profileForm, validationConfig);
    openPopup(profileModal);
})

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardButtonOpen.addEventListener('click', () => {
    cardForm['place-name'].value = '';
    cardForm.link.value = '';
    clearValidation(cardForm, validationConfig);
    openPopup(cardModal);
});

cardForm.addEventListener('submit', handleCardFormSubmit);

profileImageButtonOpen.addEventListener('click', () => {
    profileImageForm['link'].value = '';
    clearValidation(profileImageForm, validationConfig);
    openPopup(profileImageModal);
});

profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);

enableValidation(validationConfig);