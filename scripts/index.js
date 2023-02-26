// ---profile---
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__job');

// ---popup---
const profileEditPopup = document.querySelector('.popup--profile');
const addCardPopup = document.querySelector('.popup--location');

// ---input---
const profileNameInput = document.querySelector('.form__input--name');
const profileJobInput = document.querySelector('.form__input--job');
const cardLocInput = document.querySelector('.form__input--location');
const cardImgInput = document.querySelector('.form__input--image');

// ---buttons---
const profileEditButton = document.querySelector('.button--edit');
const addCardButton = document.querySelector('.button--add');
const closePopupButton = document.querySelectorAll('.button--close');
const saveFormButton = document.querySelectorAll('.button--save');

// ---template wrapper---
const cardsContainer = document.querySelector('.container.location');

// ---template---
const template = document.querySelector('.card-template');


// --- create initial cards ---
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


// ---open popup on click ---
const openPopup = (popup) => popup.classList.remove('popup--closed');

profileEditButton.addEventListener('click', () => openPopup(profileEditPopup));
addCardButton.addEventListener('click', () => openPopup(addCardPopup))


// ---close popup on click---
const closePopup = (popup) => popup.classList.add('popup--closed')

closePopupButton.forEach(button => {
    button.addEventListener('click', (event) => {
        closePopup(event.target.closest('.popup'));
    });
});


// ---check validity of url---
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};


// ---add new card---
const addCard = (event) => {
    event.preventDefault();

    const title = cardLocInput.value;
    const url = cardImgInput.value;

    cardLocInput.addEventListener('input', () => {
        const errorMessage = addCardPopup.querySelector('.error-message--name');
        errorMessage.textContent = '';
    });

    cardImgInput.addEventListener('input', () => {
        const errorMessage = addCardPopup.querySelector('.error-message--url');
        errorMessage.textContent = '';
    });

    if (title === '') {
        // Show an error message to the user
        const errorMessage = addCardPopup.querySelector('.error-message--name');
        errorMessage.textContent = 'Введите название места';
        return false; // Return false if the URL is not valid
    }

    if (!isValidUrl(url)) {
        // Show an error message to the user
        const errorMessage = addCardPopup.querySelector('.error-message--url');
        errorMessage.textContent = 'Введите корректную ссылку на картинку';
        return false; // Return false if the URL is not valid
    }

    // Clear any existing error message
    const errorMessage = addCardPopup.querySelector('.error-message');
    errorMessage.textContent = '';

    renderItem(cardsContainer, title, url);
    cardLocInput.value = '';
    cardImgInput.value = '';
    return true; // Return true if the card is added successfully
}


// ---remove card---
const removeCard = (event) => event.target.closest('.location__card').remove();

cardsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('button--remove')) {
        removeCard(event);
    }
});


// ---edit profile---
const editProfile = (event) => {
    event.preventDefault();

    if (profileNameInput.value !== '') {
        profileNameField.textContent = profileNameInput.value;
    }

    if (profileJobInput.value !== '') {
        profileJobField.textContent = profileJobInput.value;
    }

    profileNameInput.value = '';
    profileJobInput.value = '';
    closePopup(profileEditPopup)
}


// ---submit form---
const saveClick = (event) => {
    event.preventDefault();

    const popup = event.target.closest('.popup');

    if (popup === profileEditPopup) {
        if (editProfile(event)) {
            closePopup(profileEditPopup);
        }
    } else if (popup === addCardPopup) {
        if (addCard(event)) {
            closePopup(addCardPopup);
        }
    }
}

saveFormButton.forEach(button => {
    button.addEventListener('click', saveClick)
    console.log('click')
});
