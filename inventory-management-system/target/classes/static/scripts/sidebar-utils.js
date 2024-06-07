function loadUserProfile() {
    var userNameElement = document.querySelector('.user-name');
    userNameElement.textContent = localStorage.getItem('user-name');

    var userRoleElement = document.querySelector('.user-role');

    var role;

    if (localStorage.getItem('user-role') === 1){
        userRoleElement.textContent = "Admin";
    }

    else if (localStorage.getItem('user-role') === 1) {
        userRoleElement.textContent = "Manager";
    }

    else if (localStorage.getItem('user-role') === 3) {
        userRoleElement.textContent = "Customer";
    }

    else if (localStorage.getItem('user-role') === 4) {
        userRoleElement.textContent = "Supplier";
    }
}

document.addEventListener('DOMContentLoaded', loadUserProfile);