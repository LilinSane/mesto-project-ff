import {closePopup, openPopup} from "../../shared/modal";

const profileModal = document.querySelector('.popup_type_edit');
const buttonOpen = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];


//Обработка отправки формы
function handleFormSubmit(e){
    e.preventDefault();
    document.querySelector('.profile__title').textContent = profileForm.name.value;
    document.querySelector('.profile__description').textContent = profileForm.description.value;
    closePopup(profileModal);
}

buttonOpen.addEventListener('click', () => {
    profileForm.name.value = document.querySelector('.profile__title').textContent;
    profileForm.description.value = document.querySelector('.profile__description').textContent;
    openPopup(profileModal);
})

profileForm.addEventListener('submit', handleFormSubmit);