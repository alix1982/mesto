export class UserInfo {
  constructor ({name, work, avatar})
    {
      this.name = document.querySelector(name);
      this.work = document.querySelector(work);
      this.avatar = document.querySelector(avatar)
    }
    
    getUserInfo = () => {
      return {name: this.name.textContent, work: this.work.textContent};
    };
    
    setUserInfo = (inputList) => {
      this.name.textContent = inputList.name;
      this.work.textContent = inputList.work;
    };
    
    setUserAvatar = (inputList) => {
      this.avatar.src = inputList.linkAvatar;
    }
}

