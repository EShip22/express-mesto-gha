class Api {
  constructor(options) {
		this._baseUrl = options.baseUrl;
		//	this._baseUrlforAuth = options.baseUrlforAuth;
		this._usersUrl = `${this._baseUrl}/users/me`;
		this._cardUrl = `${this._baseUrl}/cards`;
  }
	
	_getResponseData(res) {
			if (!res.ok) {
					return Promise.reject(`Ошибка: ${res.status}`); 
			}
			return res.json();
	}

	getInitialCards() {
		const token = localStorage.getItem('jwt');
		return fetch(this._cardUrl, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				return this._getResponseData(res);
			})
	}
	
	addCard(cardName, cardLink) {
		const token = localStorage.getItem('jwt');
		return fetch(api._cardUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: cardName,
				link: cardLink
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}
	
	delCardQuery(id) {
		const token = localStorage.getItem('jwt');
		return fetch(`${api._cardUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				return api._getResponseData(res);
			});
	}
	
	getUserInfo() {
		const token = localStorage.getItem('jwt');
		return fetch(this._usersUrl, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}

	setUserInfo(formValues) {
		const token = localStorage.getItem('jwt');
		return fetch(this._usersUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: formValues.name,
				about: formValues.description
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}
	
	addLike(cardId) {
		const token = localStorage.getItem('jwt');
		return fetch(`${api._cardUrl}/${cardId}/likes`, {
			method: 'PUT',
			headers : {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => {
				return this._getResponseData(res);
			});
	}
	
	delLike(cardId) {
		const token = localStorage.getItem('jwt');
		return fetch(`${api._cardUrl}/${cardId}/likes`, {
			method: 'DELETE',
			headers : {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}

	setUserAvatar(urlAvatar) {
		const token = localStorage.getItem('jwt');
		return fetch(`${api._usersUrl}/avatar`, {
			method: 'PATCH',
			headers : {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				avatar: urlAvatar
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}

	register(formValues) {
		return fetch(`${api._baseUrl}/signup`, {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password: formValues?.password ?? '',
				email: formValues?.email ?? ''
			})
		})
			.then(res => {
				return this._getResponseData(res);
			})
	}

	authorization(formValues) {
		return fetch(`${api._baseUrl}/signin`, {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: formValues?.password ?? '',
				email: formValues?.email ?? ''
			})
		})
			.then(res => {
				return this._getResponseData(res);
			})
	}

	getContent(jwt) {
		return fetch(`${api._baseUrl}/users/me`, {
			method: 'GET',
			headers : {
				'Content-Type': 'application/json',
				Authorization : `Bearer ${jwt}`
			}
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then(data => data)
	}
}

export const api = new Api({
	//	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
	//	baseUrlforAuth: 'https://auth.nomoreparties.co',
		baseUrl: 'http://localhost:3001',
	//	baseUrlforAuth: 'http://localhost:3001',
	/*headers: {
		//	authorization: 'ddf428a7-16b6-4724-b90f-7c16ff158dcf',
		//	'Content-Type': 'application/json'
	}*/
});