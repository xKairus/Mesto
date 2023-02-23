// ---profile---
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');

// ---popup-form---
const profilePopup = document.querySelector('.popup-form--profile');
const locationPopup = document.querySelector('.popup-form--location');

// ---input---
const nameInput = document.querySelector('.name-input');
const jobInput = document.querySelector('.job-input');
const locInput = document.querySelector('.location-input');
const imgInput = document.querySelector('.image-input');

// ---buttons---
const editButton = document.querySelector('.button--edit');
const addButton = document.querySelector('.button--add');
const closeButton = document.querySelectorAll('.button--close');
const saveButton = document.querySelectorAll('.button--save');

// ---location---
const cardsContainer = document.querySelector('.container.location');

// --- cards array---
import { initialCards } from './initialCards.js';


// ---functions---
function openPopup(popup) {
    popup.classList.remove('hidden');
}

function closePopup(popup) {
    popup.classList.add('hidden');
    nameInput.value = ''
    jobInput.value = ''
    locInput.value = '';
    imgInput.value = '';
}

function editProfile(event) {
    event.preventDefault();

    if (nameInput.value !== '') {
        nameField.textContent = nameInput.value;
    }

    if (jobInput.value !== '') {
        jobField.textContent = jobInput.value;
    }

    closePopup(profilePopup);
}



function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('location__card');

    const imageElement = document.createElement('img');
    imageElement.src = card.link;
    imageElement.alt = card.name;
    imageElement.classList.add('location__image');

    const infoElement = document.createElement('div');
    infoElement.classList.add('location__info');

    const nameElement = document.createElement('h2');
    nameElement.textContent = card.name;
    nameElement.classList.add('location__name');

    const likeButton = document.createElement('button');
    likeButton.classList.add('button', 'button--like');

    const removeButton = document.createElement('button');
    removeButton.classList.add('button', 'button--remove');

    infoElement.appendChild(nameElement);
    infoElement.appendChild(likeButton);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(infoElement);
    cardElement.appendChild(removeButton);

    return cardElement;
}

initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardsContainer.insertBefore(cardElement, cardsContainer.firstChild);
});

function addCard(event) {
    event.preventDefault();

    const newCard = {
        name: locInput.value,
        link: imgInput.value
    };

    initialCards.push(newCard);

    const cardElement = createCard(newCard);
    cardsContainer.insertBefore(cardElement, cardsContainer.firstChild);

    closePopup(locationPopup);
}

function removeCard(event) {
    const card = event.target.closest('.location__card');
    card.parentNode.removeChild(card);
}

function saveClick(event) {
    event.preventDefault();

    if (event.target.dataset.location === 'profile') {
        editProfile(event);
    } else if (event.target.dataset.location === 'card') {
        addCard(event);
    }

    closePopup(profilePopup);
}


// ---open profile popup on click---
editButton.addEventListener('click', function () {
    openPopup(profilePopup);
});

// ---open location popup on click---
addButton.addEventListener('click', function () {
    openPopup(locationPopup);
});

// ---close opened popup on click---
closeButton.forEach(function (button) {
    button.addEventListener('click', function () {
        closePopup(button.parentNode);
    });
});

// ---save information and close opened popup on click---
saveButton.forEach(button => {
    button.addEventListener('click', saveClick);
});

// ---remove card on click---
cardsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('button--remove')) {
        removeCard(event);
    }
});

