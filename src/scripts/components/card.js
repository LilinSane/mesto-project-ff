import {deleteCard, deleteLikeCard, likeCard} from "./api";

export const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

export function createCardElement(card, currentUserId, onDelete, onLike, onPopupImage) {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
    cardImage.alt = card.name;

    setLikeCounter(likeCounter, card.likes.length);

    cardElement.querySelector(".card__title").textContent = card.name;
    if(card.owner._id !== currentUserId){
        deleteButton.remove();
    }
    else {
        deleteButton.addEventListener("click", () => onDelete(cardElement, card._id));
    }
    if (card.likes.some(user => user._id === currentUserId)){
        toggleLikeButton(likeButton);
    }
    likeButton.addEventListener("click", () => onLike(likeButton, currentUserId, card, likeCounter));
    cardImage.addEventListener("click", onPopupImage);
    return cardElement;
}

function setLikeCounter(likeCounter, count){
    likeCounter.textContent = count;
}

function toggleLikeButton(likeButton){
    if (likeButton.classList.contains("card__like-button")) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    else if (likeButton.classList.contains("card__like-button_is-active")) {
        likeButton.classList.remove("card__like-button_is-active");
    }
}

export function handleDeleteCard(cardElement, cardId) {
    deleteCard(cardId)
        .then(
            cardElement.remove()
        )
        .catch(reportError => console.log(reportError));
}

export function handleLikeCard(likeButton, currentUserId, card, likeCounter) {
    const toggleLike = !card.likes.some(user => user._id === currentUserId)
        ? likeCard(card._id) : deleteLikeCard(card._id);
    toggleLike
        .then((updatedCard) => {
            card.likes = updatedCard.likes;
            toggleLikeButton(likeButton);
            setLikeCounter(likeCounter, card.likes.length);
        })
        .catch(reportError => console.log(reportError));
}
