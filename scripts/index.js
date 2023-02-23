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
const saveButton = document.querySelector('.button--save');

function openPopup(popup) {
    popup.classList.remove('hidden');
}

function closePopup(popup) {
    popup.classList.add('hidden');
    nameInput.value = ''
    jobInput.value = ''
}

function editProfile(e) {
    e.preventDefault()
    
    if (nameInput.value == "") {
    } else {
        nameField.innerHTML = nameInput.value;
    }
    
    if (jobInput.value == "") {
    } else {
        jobField.innerHTML = jobInput.value;
    }
    
    closePopup(profilePopup)
}

editButton.addEventListener('click', function () {
    openPopup(profilePopup);
});

addButton.addEventListener('click', function () {
    openPopup(locationPopup);
});

closeButton.forEach(function (button) {
    button.addEventListener('click', function () {
        closePopup(button.parentNode);
    });
});

saveButton.addEventListener('click', editProfile);