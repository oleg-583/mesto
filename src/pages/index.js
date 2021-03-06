import ("./index.css");

import {
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
} from "../js/utils/constatns.js";

import { Card } from "../js/components/card.js";
import { FormValidator } from "../js/components/formValidator.js";
import { Section } from "../js/components/section.js";
import PopupWithImage from "../js/components/popupWithImage.js";
import PopupWithForm from "../js/components/popupWithForm.js";
import UserInfo from "../js/components/userInfo.js"


const handleAddCard = () => {
    addCardForm.reset();
    addCardFormValidator.clearValidation();
    addCardPopup.open();
};

const handleEditProfile = () => {
    const { name, description } = user.getUserInfo();
    textNameInput.value = name;
    textDescriptionInput.value = description;
    profileFormValidator.clearValidation();
    profilePopup.open();
};

const viewImagePopup = new PopupWithImage(popupPhotoSelector);

const getCard = (data) => {
    const card = new Card(
        data,
        () => viewImagePopup.open(data.name, data.link),
        cardTemplateSelector
    );
    return card.generateCard();
};

const cardsSection = new Section({
        items: initialCards,
        renderer: (data) => {
            cardsSection.addItem(getCard(data));
        },
    },
    elementsListSelector
);

const user = new UserInfo({
    nameSelector: nameSelector,
    descriptionSelector: descriptionSelector,
});

const profileSubmitHandler = (data) => {
    user.setUserInfo({
        name: data["type-name"],
        description: data["type_descriptione"],
    });
    profilePopup.close();
};

const profilePopup = new PopupWithForm(popupProfileSelector, (data) =>
    profileSubmitHandler(data)
);

const addCardSubmitHandler = (data) => {
    const name = data["type_card-name"];
    const link = data["type_card-link"];
    cardsSection.addItem(getCard({ name, link }));
    addCardPopup.close();
};

const addCardPopup = new PopupWithForm(popupAddCardSelector, (data) =>
    addCardSubmitHandler(data)
);

const profileFormValidator = new FormValidator(validateClasses, profileForm);
const addCardFormValidator = new FormValidator(validateClasses, addCardForm);

viewImagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editButton.addEventListener("click", handleEditProfile);
addButton.addEventListener("click", handleAddCard);

cardsSection.renderItems();