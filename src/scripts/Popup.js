export class Popup {
  constructor (popupSelector) {
    this.popupSelector = popupSelector;
  }
  openPopup = (popupElement) => {
    popupElement.classList.add(this.popupSelector);
    document.addEventListener('keydown', this._handleEscClose);
  };
  closePopup = (popupElement) => {
    popupElement.classList.remove(this.popupSelector);
    document.removeEventListener('keydown', this._handleEscClose);
  };
  setEventListener = (popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))){
        this.closePopup (popupElement);
      };
    });
  };
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup (document.querySelector(`.${this.popupSelector}`));
    };
  };
};