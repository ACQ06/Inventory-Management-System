function loadUserProfile() {
    var userNameElement = document.querySelector('.user-name');
    userNameElement.textContent = localStorage.getItem('user-name');

    var userRoleElement = document.querySelector('.user-role');

    var role;

    if (localStorage.getItem('user-role') === 1){
        userRoleElement.textContent = "Admin";
    }

    else if
}

document.addEventListener('DOMContentLoaded', loadUserProfile);