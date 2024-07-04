class Auth {
    constructor() {
        this.users = [
            { username: 'Ben', password: 'Ben', isAdmin: false },
            { username: 'Eric', password: 'Eric', isAdmin: false },
            { username: 'Admin', password: 'Gogi1998!', isAdmin: true }
        ];
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }
        return null;
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        const userJSON = sessionStorage.getItem('currentUser');
        return userJSON ? JSON.parse(userJSON) : null;
    }

    isLoggedIn() {
        return !!this.getCurrentUser();
    }

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.isAdmin;
    }
}

const auth = new Auth();
