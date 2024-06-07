function logoutUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'api/users/logout', false);
    xhr.send();

    if (xhr.status === 200) {
        window.location.href = "/login";
        return true;
    }
}

function loginUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/users/login', false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            localStorage.setItem('user-id', data.id);
            localStorage.setItem('user-name', data.name);
            localStorage.setItem('user-role', data.role);
            alert("Login Success!");

            if (data.role === 1) {
                window.location.href = "/userManagement";
            } else if (data.role === 2) {
                window.location.href = "/dashboard";
            } else {
                window.location.href = "/customerOrder";
            }
        } else {
            // Request failed
            console.error("Request failed with status:", xhr.status);
            alert("Incorrect Username or Password");
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


function notExistingUser(userName, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/users?name=${userName}`, false);

    xhr.onerror = function () {
        console.error("Request failed");
        callback(false);
    };

    xhr.send();

    if (xhr.status === 200) {
        console.log(xhr)
        return false;
    } else {
        console.error("Request failed with status:", xhr.status);
        return true;
    }
}

