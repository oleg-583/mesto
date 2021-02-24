// import { initialCards } from "./pictures.js";

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

//обработчики
editButton.addEventListener("click", editProfile);
editForm.addEventListener("submit", profileFormSubmit);

addButton.addEventListener("click", addCard);
addCardForm.addEventListener("submit", addCardSubmit);

cross.forEach((btn) =>
    btn.addEventListener("click", closePopupButton)
);

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
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
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

function getCard({ name, link }) {
    const newCard = templateCard.content.cloneNode(true);

    const nameCard = newCard.querySelector(".elements__name");
    nameCard.textContent = name;

    const trashButton = newCard.querySelector(".elements__trash-button");
    trashButton.addEventListener("click", deleteCard);

    const likeButton = newCard.querySelector(".elements__like");
    likeButton.addEventListener("click", toggleLike);

    const imgEl = newCard.querySelector(".elements__image");
    imgEl.src = link;
    imgEl.alt = name;
    imgEl.addEventListener("click", viewImage);

    return newCard;
}

// активация лайка
function toggleLike(event) {
    event.target.classList.toggle("elements__like_active");
}

//удаление карточки 
function deleteCard(event) {
    event.target.closest(".elements__element").remove();
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

//загрузка базовых карточек
initialCards.forEach((card) => renderCard(getCard(card)));