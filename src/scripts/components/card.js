export const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

export function createCardElement(data, onDelete, onLike, onPopupImage) {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector('.card__like-button');

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardElement.querySelector(".card__title").textContent = data.name;

    deleteButton.addEventListener("click", () => onDelete(cardElement));
    likeButton.addEventListener("click", () => onLike(likeButton));
    cardImage.addEventListener("click", onPopupImage);
    return cardElement;
}

export function handleDeleteCard(cardElement) {
    cardElement.remove();
}

export function handleLikeCard(likeButton) {
    if (likeButton.classList.contains("card__like-button")) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    else if (likeButton.classList.contains("card__like-button_is-active")) {
        likeButton.classList.remove("card__like-button_is-active");
    }
}
