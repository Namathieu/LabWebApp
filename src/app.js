document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const requestForm = document.getElementById('requestForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = auth.login(username, password);
        if (user) {
            showappropriateView();
        } else {
            alert('Invalid username or password');
        }
    });

    requestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const request = document.getElementById('requestInput').value;
        const user = auth.getCurrentUser();
        requestManager.addRequest(user.username, request);
        displayUserRequests();
        document.getElementById('requestInput').value = '';
    });

    [logoutBtn, adminLogoutBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            auth.logout();
            showLoginView();
        });
    });

    function showLoginView() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('userPage').classList.add('hidden');
        document.getElementById('adminPage').classList.add('hidden');
    }

    function showUserView(username) {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('userPage').classList.remove('hidden');
        document.getElementById('adminPage').classList.add('hidden');
        document.getElementById('userWelcome').textContent = username;
        displayUserRequests();
    }

    function showAdminView() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('userPage').classList.add('hidden');
        document.getElementById('adminPage').classList.remove('hidden');
        displayAllRequests();
        displayAllUsers();
    }

    function showappropriateView() {
        const user = auth.getCurrentUser();
        if (user.isAdmin) {
            showAdminView();
        } else {
            showUserView(user.username);
        }
    }

    function displayUserRequests() {
        const user = auth.getCurrentUser();
        const userRequests = requestManager.getUserRequests(user.username);
        const tbody = document.querySelector('#userRequests tbody');
        tbody.innerHTML = '';
        userRequests.forEach(r => {
            tbody.innerHTML += `<tr><td>${r.request}</td><td>${r.status}</td></tr>`;
        });
    }

    function displayAllRequests() {
        const tbody = document.querySelector('#allRequests tbody');
        tbody.innerHTML = '';
        requestManager.getAllRequests().forEach((r, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${r.user}</td>
                    <td>${r.request}</td>
                    <td>${r.status}</td>
                    <td>
                        <button onclick="updateStatus(${index}, 'Resolved')">Resolve</button>
                        <button onclick="updateStatus(${index}, 'Cancelled')">Cancel</button>
                        <button onclick="updateStatus(${index}, 'Ongoing')">Ongoing</button>
                        <button onclick="removeRequest(${index})">Remove</button>
                    </td>
                </tr>
            `;
        });
    }

    function displayAllUsers() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        auth.users.forEach(u => {
            userList.innerHTML += `<li>${u.username} (${u.isAdmin ? 'Admin' : 'User'})</li>`;
        });
    }

    window.updateStatus = function(index, status) {
        requestManager.updateStatus(index, status);
        displayAllRequests();
    }

    window.removeRequest = function(index) {
        if (confirm('Are you sure you want to remove this request?')) {
            requestManager.removeRequest(index);
            displayAllRequests();
        }
    }

    // Check if user is already logged in
    if (auth.isLoggedIn()) {
        showappropriateView();
    } else {
        showLoginView();
    }
});
