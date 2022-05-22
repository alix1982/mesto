export class Popup {
  constructor (popupSelector) {
    this.popupSelector = popupSelector;
  }
  open () {
    this.popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  close () {
    this.popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  setEventListeners () {
    this.popupSelector.addEventListener('click', (evt) => {
      if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))){
        this.close ();
      };
    });
  };
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close (this.popupSelector);
    };
  };
};
