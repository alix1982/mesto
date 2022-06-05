export class Api {
  constructor (
      {render, renderClose}
      )
  {
    this.render = render;
    this.renderClose = renderClose
  }

  getUserInfo = (inputList) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({
           name: inputList.name,
           about: inputList.work
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        this.renderClose();
      })
      .catch((err) => {
        console.log(err)
      }); 
  }

  getAddCard = (inputList) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
      method: 'POST',
      headers: {
        authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputList.title,
        link: inputList.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        this.render(inputList, result)
        const buttonDel = document.querySelector('.element__del');
        buttonDel.classList.add('element__del_active');
        //console.log(result);
        this.renderClose();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  getUserAvatar = (inputList) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me/avatar', {
      method: 'PATCH',
      headers: {
       authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({
         avatar: inputList.linkAvatar,
      })
    })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        this.renderClose();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getCardDel = (imgCard, method) => {
    fetch (`https://mesto.nomoreparties.co/v1/cohort-42/cards/${imgCard.id}`, {
        method: method,
        headers: {
          authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getCounterLike = (elementImg, method) => {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${elementImg.id}/likes`, {
      method: method,
      headers: {
        authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
        console.log(err)
      })
  }

getCards = () => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
    headers: {
      authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      this.render(result)
      const elementsDel = document.querySelectorAll('.element__del');
      const elementsLike = document.querySelectorAll('.element__like');
      const userName = document.querySelector('.profile__name').textContent;
      for (let i = 0; i<=(result.length-1); i++) {
        if (result[(result.length-1) - i].owner.name === userName) {
          elementsDel[i].classList.add('element__del_active');
        }
      };
      result.forEach((item, itemIndex) => {
        item.likes.forEach((like) => {
          if (like.name === userName) {
            elementsLike[elementsLike.length - 1 - itemIndex].classList.add('element__like_active')
          }
        })
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
        console.log(err);
      }); 
}

getUser = () => {
  fetch('https://nomoreparties.co/v1/cohort-42/users/me', {
    headers: {
      authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5'
    }
  })
    .then(res => res.json())
    .then((result) => {
      document.querySelector('.profile__name').textContent = result.name;
      document.querySelector('.profile__work').textContent = result.about;
      document.querySelector('.profile__avatar').src = result.avatar;
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err);
    })
}
}