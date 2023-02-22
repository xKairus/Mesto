const popup = document.querySelector('.popup-form');

const nameField = document.querySelector('.profile__name')
const jobField = document.querySelector('.profile__job')

const nameInput = document.querySelector('.name-input');
const jobInput = document.querySelector('.job-input');

const editButton = document.querySelector('.button--edit')
const saveButton = document.querySelector('.button--save')
const closeButton = document.querySelector('.button--close')


function popupOpen() {
    popup.classList.remove('hidden')
};

function popupClose() {
    popup.classList.add('hidden')
};

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
    
    popupClose()

    nameInput.value = ''
    jobInput.value = ''
}

editButton.addEventListener('click', popupOpen);

closeButton.addEventListener('click', popupClose);

saveButton.addEventListener('click', editProfile);

