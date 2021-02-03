const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const cross = document.querySelector('.popup__close-button');
const textName = document.querySelector('.profile__name');
const textDescription = document.querySelector('.profile__description');
const textNameInput = document.querySelector('.popup__input_type_name');
const textDescriptionInput = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form');

editButton.addEventListener('click', edit);

function edit() {
    popup.classList.add('popup_opened');
    textNameInput.value = textName.textContent;
    textDescriptionInput.value = textDescription.textContent;
}

cross.addEventListener('click', exitPopup);

function exitPopup() {
    popup.classList.remove('popup_opened');
}

function saveAdd(evt) {
    evt.preventDefault();
    textName.textContent = textNameInput.value;
    textDescription.textContent = textDescriptionInput.value;
    exitPopup();
}

editForm.addEventListener('submit', saveAdd);