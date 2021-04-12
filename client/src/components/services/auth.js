class Auth {
	constructor() {
		this.isLoggedIn = true;
	}

	login() {}
	logout() {
		localStorage.clear();
		this.isLoggedIn = false;
	}
	getUser() {}
}

export default new Auth();
