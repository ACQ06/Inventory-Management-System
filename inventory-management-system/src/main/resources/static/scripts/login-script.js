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

function loginUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/users/login', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            alert(xhr.responseText);
            window.location.href = "/userManagement";
        } else {
            // Request failed
            console.error("Request failed with status:", xhr.status);
            alert(xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Request failed");
    };

    var data = {
        name: usernameInput.value,
        password: passwordInput.value
    };

    var json = JSON.stringify(data);

    xhr.send(json);
}