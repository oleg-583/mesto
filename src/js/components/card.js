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

        this._imgPhoto.src = this._link;
        this._imgPhoto.alt = this._name;

        return this._element;
    }

    //удаление карточки
    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    //активация лайка 
    _handleToggleLike() {
        this._likeBtn.classList.toggle("elements__like_active");
    }

    //функции кликов
    _setEventListeners() {
        this._removeBtn = this._element.querySelector(".elements__trash-button");
        this._removeBtn.addEventListener("click", () => this._handleDeleteCard());

        this._likeBtn = this._element.querySelector(".elements__like");
        this._likeBtn.addEventListener("click", () => this._handleToggleLike());

        this._imgPhoto = this._element.querySelector(".elements__image");
        this._imgPhoto.addEventListener("click", () => this._ViewImage(this._name, this._link));
    }
}

export { Card }