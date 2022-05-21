import {Popup} from './Popup.js';
import {element, getCard, popupWinAdd, popupWinInfo, userInfo} from './index.js';

const inputAddTitle = document.querySelector('.formAdd__text_title');
const inputAddLink = document.querySelector('.formAdd__text_link');

export class PopupWithForm extends Popup{
  constructor (popupSelector)
    {super (popupSelector)}
    _getInputValues = (evt) => {
      evt.preventDefault();
      if (document.querySelector(`.${this.popupSelector}`) === popupWinInfo) {
        userInfo.setUserInfo();
      };
      if (document.querySelector(`.${this.popupSelector}`) === popupWinAdd) {
        element.prepend(getCard(inputAddLink.value, inputAddTitle.value));
      }
    };
    setEventListeners = (popupElement) => {
      popupElement.addEventListener('click', (evt) => {
        if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))){
          this.closePopup (popupElement);
        };
      });
      popupElement.addEventListener('submit', (evt) => {
        this._getInputValues (evt);
        this.closePopup(popupElement);
      });
    };
    closePopup = (popupElement) => {
      popupElement.classList.remove(this.popupSelector);
      document.removeEventListener('keydown', this._handleEscClose);
      popupElement.querySelector('.form').reset();
    };
}