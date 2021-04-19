export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupButton = this._popup.querySelector(".popup__close-button");
        this.close = this.close.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        this._popup.addEventListener("pointerdown", this._handleClose);
        document.addEventListener("keydown", this._handleClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        this._popup.removeEventListener("pointerdown", this._handleClose);
        document.removeEventListener("keydown", this._handleClose);
    }

    _handleClose(evt) {
        if (evt.key === "Escape" || evt.target === this._popup) {
            this.close();
        }
    }

    setEventListeners() {
        this._closePopupButton.addEventListener("click", this.close);
    }
}




// // открытие и закрытие попапов
// function closePopup(popup) {
//     popup.classList.remove("popup_opened");
//     document.removeEventListener("keydown", closePopupOnEsc);
// }

// function openPopup(popup) {
//     popup.classList.add("popup_opened");
//     document.addEventListener("keydown", closePopupOnEsc);
// }

// //функция закрытия попапа с помощью Esc
// function closePopupOnEsc(evt) {
//     const popupOpened = document.querySelector(".popup_opened");
//     if (evt.key === "Escape") {
//         closePopup(popupOpened);
//     }
// }