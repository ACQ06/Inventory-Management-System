document.querySelector(".button-login").addEventListener("click", function () {
    loginUser();
});

document.querySelector(".logo").addEventListener("click", function () {
    window.location.href = "/";
});

const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.querySelector('.div-showpass input[type="checkbox"]');
const usernameInput = document.getElementById("username");
showPasswordCheckbox.addEventListener("click", function () {
    if (this.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});