import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        const imgEl = this._popup.querySelector(".popup__photo-image");
        const imgName = this._popup.querySelector(".popup__photo-name");
        imgEl.src = link;
        imgEl.alt = name;
        imgName.textContent = name;
        super.open();
    }
}