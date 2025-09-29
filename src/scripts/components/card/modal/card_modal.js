import {closePopup, openPopup} from "../../shared/modal";
import {handleDeleteCard, createCardElement, placesWrap} from "../cards";

const cardModal = document.querySelector('.popup_type_new-card');
const buttonOpen = document.querySelector('.profile__add-button');
const cardForm = document.forms['new-place'];


//Обработка отправки формы
function handleFormSubmit(e){
    e.preventDefault();
    placesWrap.prepend(createCardElement({
        name: cardForm['place-name'].value,
        link: cardForm.link.value,
    }, handleDeleteCard))
    closePopup(cardModal);
}

buttonOpen.addEventListener('click', () => {
    cardForm['place-name'].value = '';
    cardForm.link.value = '';
    openPopup(cardModal);
})

cardForm.addEventListener('submit', handleFormSubmit);