class RequestManager {
    constructor() {
        this.requests = JSON.parse(sessionStorage.getItem('requests')) || [];
    }

    addRequest(username, request) {
        this.requests.push({ user: username, request: request, status: 'Pending' });
        this.saveRequests();
    }

    updateStatus(index, status) {
        this.requests[index].status = status;
        this.saveRequests();
    }

    removeRequest(index) {
        this.requests.splice(index, 1);
        this.saveRequests();
    }

    getUserRequests(username) {
        return this.requests.filter(r => r.user === username);
    }

    getAllRequests() {
        return this.requests;
    }

    saveRequests() {
        sessionStorage.setItem('requests', JSON.stringify(this.requests));
    }
}

const requestManager = new RequestManager();
