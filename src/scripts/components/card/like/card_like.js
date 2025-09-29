import {placesList} from "../cards";

placesList.addEventListener('click', (e) => {
    if (e.target.classList.contains("card__like-button")) {
        e.target.classList.toggle("card__like-button_is-active");
    }
    else if (e.target.classList.contains("card__like-button_is-active")) {
        e.target.classList.remove("card__like-button_is-active");
    }
})