document.querySelector(".logo").addEventListener("click", function () {
    window.location.href = "/";
});

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const showPasswordCheckbox = document.querySelector('.div-showpass input[type="checkbox"]');

showPasswordCheckbox.addEventListener("click", function () {
    if (this.checked) {
        passwordInput.type = "text";
        confirmPasswordInput.type = "text";
    } else {
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";
    }
});

function registerUser() {
  const usernameInput = document.getElementById("username");

  if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Passwords must be the same!");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", '/api/customers', true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      console.log(xhr.responseText);
      window.location.href = "/userManagement";
    } else {
      // Request failed
      console.error("Request failed with status:", xhr.status);
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