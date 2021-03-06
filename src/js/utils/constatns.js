// исходные карточки
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// классы валидации  
const validateClasses = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inputErrorClass: ".popup__input-error",
    errorClass: "popup__input-error_active",
};

//Селекторы
const popupPhotoSelector = ".popup_photo";
const elementsListSelector = ".elements__list";
const cardTemplateSelector = ".template";
const popupProfileSelector = ".popup_profile";
const nameSelector = ".profile__name";
const descriptionSelector = ".profile__description";
const popupAddCardSelector = ".popup_add-card";

//кнопки 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//редактирование профиля
const popupProfile = document.querySelector(popupProfileSelector);
const profileForm = popupProfile.querySelector('.popup__form');
const textNameInput = profileForm.querySelector('.popup__input_type_name');
const textDescriptionInput = profileForm.querySelector('.popup__input_type_description');

// Форма добавления карточки
const addCardPopup = document.querySelector(popupAddCardSelector);
const addCardForm = addCardPopup.querySelector(".popup__form_add-card");





export {
    initialCards,
    validateClasses,
    editButton,
    addButton,
    textNameInput,
    textDescriptionInput,
    addCardForm,
    profileForm,
    popupPhotoSelector,
    cardTemplateSelector,
    elementsListSelector,
    popupProfileSelector,
    nameSelector,
    descriptionSelector,
    popupAddCardSelector
};