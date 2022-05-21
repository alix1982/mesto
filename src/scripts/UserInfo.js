import {popup} from './index.js';
import {inputInfoName, inputInfoWork, popupWinInfo} from './index.js';

export class UserInfo {
  constructor (name, work)
    {
      this.name = name;
      this.work = work;
    }
    getUserInfo = () => {
      inputInfoName.value = this.name.textContent;
      inputInfoWork.value = this.work.textContent;
      popup.openPopup(popupWinInfo);
    };
    setUserInfo = () => {
      this.name.textContent = inputInfoName.value;
      this.work.textContent = inputInfoWork.value;
    };
}