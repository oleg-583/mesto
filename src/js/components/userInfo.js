export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent.trim(),
            description: this._description.textContent.trim(),
        };
    }

    setUserInfo({ name, description }) {
        this._name.textContent = name.trim();
        this._description.textContent = description.trim();
    }
}