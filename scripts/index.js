// ---profile---
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__job');

// ---popup-form---
const profileEditPopup = document.querySelector('.popup-form--profile');
const addCardPopup = document.querySelector('.popup-form--location');

// ---input---
const profileNameInput = document.querySelector('.name-input');
const profileJobInput = document.querySelector('.job-input');
const cardLocInput = document.querySelector('.location-input');
const cardImgInput = document.querySelector('.image-input');

// ---buttons---
const profileEditButton = document.querySelector('.button--edit');
const addCardButton = document.querySelector('.button--add');
const closePopupButton = document.querySelectorAll('.button--close');
const saveFormButton = document.querySelectorAll('.button--save');

// ---template wrapper---
const cardsContainer = document.querySelector('.container.location');

// ---template---
const template = document.querySelector('.card-template');


const getItemElement = (title, url) => {
    const newItemElement = template.content.cloneNode(true);

    const newItemTitle = newItemElement.querySelector('.location__name');
    newItemTitle.textContent = title;

    const newItemUrl = newItemElement.querySelector('.location__image');
    newItemUrl.src = url;
    newItemUrl.alt = title;

    return newItemElement;
}

const renderItem = (wrap, title, url) => {
    wrap.prepend(getItemElement(title, url));
}

initialCards.forEach((item) => {
    renderItem(cardsContainer, item.name, item.link);
});
