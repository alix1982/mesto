export class UserInfo {
  constructor ({name, work})
    {
      this.name = document.querySelector(name);
      this.work = document.querySelector(work);
    }
    getUserInfo = () => {
      const dataInfo = {name: this.name.textContent, work: this.work.textContent};
      return this.dataInfo = dataInfo;
    };
    
    setUserInfo = (inputName, inputWork) => {
      this.getUserInfo();
      this.dataInfo.name = inputName.value;
      this.dataInfo.work = inputWork.value;
      this.name.textContent = this.dataInfo.name;
      this.work.textContent = this.dataInfo.work;
    };

}
