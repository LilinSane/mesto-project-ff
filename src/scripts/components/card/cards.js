export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

export function createCardElement(data, onDelete) {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardElement.querySelector(".card__title").textContent = data.name;

    deleteButton.addEventListener("click", onDelete);
    return cardElement;
}

// должна быть отдельной функций, можно стрелочной
export function handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
}

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
// DOM узлы
export const placesWrap = document.querySelector(".places__list");

export const placesList = document.querySelector('.places__list');

// можно сделать и через простой цикл
initialCards.forEach((data) => {
    placesWrap.append(createCardElement(data, handleDeleteCard));
});
