export class UserInfo {
  constructor ({name, work})
    {
      this.name = document.querySelector(name);
      this.work = document.querySelector(work);
    }
    
    getUserInfo = () => {
      return {name: this.name.textContent, work: this.work.textContent};
    };
    
    setUserInfo = (inputList) => {
      this.name.textContent = inputList.name;
      this.work.textContent = inputList.work;
    };
}
