import { openPopup } from "../../shared/modal";
import { placesList } from '../cards'

const cardViewModal = document.querySelector('.popup_type_image');

placesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__image')) {
        const cardElement = e.target.closest('.card');
        const cardTitle = cardElement.querySelector('.card__title')

        document.querySelector('.popup__image').src = e.target.src;
        document.querySelector('.popup__caption').textContent = cardTitle.textContent;

        openPopup(cardViewModal);
    }
})