import { initialCards, Card } from "./card.js";
import { validateClasses, FormValidator } from "./formValidator.js";

// инфо профиля
const textName = document.querySelector('.profile__name');
const textDescription = document.querySelector('.profile__description');

//редактирование профиля
const popupProfile = document.querySelector('.popup_profile');
const editForm = popupProfile.querySelector('.popup__form_profile');
const textNameInput = editForm.querySelector('.popup__input_type_name');
const textDescriptionInput = editForm.querySelector('.popup__input_type_description');

// Форма добавления карточки
const addCardPopup = document.querySelector(".popup_add-card");
const addCardForm = addCardPopup.querySelector(".popup__form_add-card");
const imgNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const imgLinkInput = addCardForm.querySelector(".popup__input_type_card-link");

// Попап просмотра картинки
const imgPopup = document.querySelector(".popup_photo");
const imgPhoto = imgPopup.querySelector(".popup__photo-image");
const imgName = imgPopup.querySelector(".popup__photo-name");

//кнопки 
const editButton = document.querySelector('.profile__edit-button');
const cross = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector(".elements__list");
const templateCard = document.querySelector(".template");
const popups = document.querySelectorAll(".popup");

// Функции

//закрытие попапа крестиком
function closePopupButton(event) {
    const targetClose = event.target;
    const popup = targetClose.closest(".popup");
    closePopup(popup);
}

// открытие и закрытие попапов
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEsc);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupOnEsc);
}

//создание профиля
function editProfile() {
    textNameInput.value = textName.textContent.trim();
    textDescriptionInput.value = textDescription.textContent.trim();

    openPopup(popupProfile);
}

//сохранение профиля
function profileFormSubmit(event) {
    event.preventDefault();

    textName.textContent = textNameInput.value.trim();
    textDescription.textContent = textDescriptionInput.value.trim();

    closePopup(popupProfile);
}

//открытие попапа создания картинки 
function addCard() {
    openPopup(addCardPopup);
}

//создание карочки 
function renderCard(cardEl) {
    cardsContainer.prepend(cardEl);
}

//сохранение попапа создания картинок
function addCardSubmit(event) {
    event.preventDefault();

    const name = imgNameInput.value.trim();
    const link = imgLinkInput.value.trim();

    renderCard(getCard({ name, link }));

    addCardForm.reset();
    closePopup(addCardPopup);
}

// открытие изображения
function viewImage(event) {
    imgPhoto.alt = event.target.alt;
    imgPhoto.src = event.target.src;
    imgName.textContent = event.target.alt;

    openPopup(imgPopup);
}

// закрытие попапов на свободную область  
function closePopupOverlay(evt) {
    closePopup(evt.target);
}

//функция закрытия попапа с помощью Esc
function closePopupOnEsc(evt) {
    const popupOpened = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(popupOpened);
    }
}

//функция открытия новых карточек
function getCard(data) {
    const card = new Card(data, viewImage, ".template");
    return card.generateCard();
}

//обработчики
editButton.addEventListener("click", editProfile);
editForm.addEventListener("submit", profileFormSubmit);

addButton.addEventListener("click", addCard);
addCardForm.addEventListener("submit", addCardSubmit);

cross.forEach((btn) =>
    btn.addEventListener("click", closePopupButton)
);
popups.forEach(popup => popup.addEventListener("click", closePopupOverlay))

//загрузка базовых карточек
initialCards.forEach((card) => renderCard(getCard(card)));


//вызов классов 
const profileFormValidator = new FormValidator(validateClasses, editForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validateClasses, addCardForm);
addCardFormValidator.enableValidation();