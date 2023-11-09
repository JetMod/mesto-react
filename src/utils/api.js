class Api {
  constructor({ url, name }) {
    this._url = url;
    this._name = name;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._name,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._name,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  saveUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._name,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  saveAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._name,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${data.avatar}`,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._name,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${data.title}`,
        link: `${data.link}`,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._name,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._name,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._name,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-74",
  name: "3a0bc90b-66b6-4f48-8f85-65228044ae82",
});

export default api;
