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

class Card {
    constructor(data, ViewImage, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._ViewImage = ViewImage;
        this._templateSelector = templateSelector;
    }

    //шаблон
    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);
    }

    //создание карты
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".elements__name").textContent = this._name;

        this._imgEl.src = this._link;
        this._imgEl.alt = this._name;

        return this._element;
    }


    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handleToggleLike() {
        this._likeBtn.classList.toggle(".elements__like_active");
    }


    //функции кликов
    _setEventListeners() {
        this._removeBtn = this._element.querySelector(".elements__trash-button");
        this._removeBtn.addEventListener("click", () => this._handleDeleteCard());

        this._likeBtn = this._element.querySelector(".elements__like");
        this._likeBtn.addEventListener("click", () => this._handleToggleLike());

        this._imgEl = this._element.querySelector(".elements__image");
        this._imgEl.addEventListener("click", () => this._ViewImage(this._name, this._link));
    }
}

export { initialCards, Card }