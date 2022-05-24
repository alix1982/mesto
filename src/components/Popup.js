export class Popup {
  constructor (popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open () {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close () {
    this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners () {
    this.popupElement.addEventListener('click', (evt) => {
      if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))){
        this.close ();
      };
    });
  };
  
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close ();
    };
  };
};
