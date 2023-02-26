// ---profile---
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__job');

// ---popup---
const profileEditPopup = document.querySelector('.popup--profile');
const addCardPopup = document.querySelector('.popup--location');
const imagePopup = document.querySelector('.popup--image');

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
};

const renderItem = (wrap, title, url) => {
    wrap.prepend(getItemElement(title, url));
};

initialCards.forEach((item) => {
    renderItem(cardsContainer, item.name, item.link);
});


// ---open popup on click ---
const openPopup = (popup) => popup.classList.add('popup--open');

profileEditButton.addEventListener('click', () => openPopup(profileEditPopup));
addCardButton.addEventListener('click', () => openPopup(addCardPopup));

const addImagePopup = (event) => {
    const image = event.target.closest('.location__card').querySelector('.location__image');
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    imagePopupImage.src = image.src;
    imagePopupImage.alt = image.alt;
    openPopup(imagePopup);
};


// ---close popup on click---
const closePopup = (popup) => popup.classList.remove('popup--open');

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

    let valid = true;

    if (title === '') {
        const errorMessage = addCardPopup.querySelector('.error-message--name');
        errorMessage.textContent = 'Введите название места';
        valid = false;
    }

    if (!isValidUrl(url)) {
        const errorMessage = addCardPopup.querySelector('.error-message--url');
        errorMessage.textContent = 'Введите корректную ссылку на картинку';
        valid = false;
    }

    if (valid) {
        // Clear any existing error message
        const errorMessage = addCardPopup.querySelector('.form__error-message');
        errorMessage.textContent = '';

        renderItem(cardsContainer, title, url);
        cardLocInput.value = '';
        cardImgInput.value = '';
    }

    return valid; // Return true if the card is added successfully
};


// ---remove card---
const removeCard = (event) => event.target.closest('.location__card').remove();

// ---like card---
const like = (event) => event.target.classList.toggle('button--like--active');

// ---click on card's buttons---
cardsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('button--remove')) {
        removeCard(event);
    }
    if (event.target.classList.contains('button--like')) {
        like(event);
    }
    if (event.target.classList.contains('location__image')) {
        addImagePopup(event);
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
    closePopup(profileEditPopup);
};


// ---submit form---
const saveClick = (event) => {
    event.preventDefault();

    const popup = event.target.closest('.popup');

    switch (popup) {
        case profileEditPopup:
            if (editProfile(event)) {
                closePopup(profileEditPopup);
            }
            break;
        case addCardPopup:
            if (addCard(event)) {
                closePopup(addCardPopup);
            }
            break;
        default:
            break;
    }
};

saveFormButton.forEach(button => button.addEventListener('click', saveClick));



