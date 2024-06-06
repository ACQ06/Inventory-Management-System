document.querySelector('.select-wrapper').addEventListener('click', function () {
    const dpdwn = document.querySelector('.dpdwn');
    this.querySelector('.select').classList.toggle('open');
    if (this.querySelector('.select').classList.contains('open')) {
        dpdwn.textContent = "keyboard_arrow_up";
    } else {
        dpdwn.textContent = "keyboard_arrow_down";
    }
});

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select__trigger span a').textContent = this.textContent;
            userType.textContent = `${option.textContent} List`;

            if (option.textContent === "Customer") {
                clearTable();
                populateCustomer();
                userType = 3;
            }

            else if (option.textContent === "Admin") {
                clearTable();
                populateAdmin();
                userType = 1;
            }

            else if (option.textContent === "Manager") {
                clearTable();
                populateManager();
                userType = 2;
            }

            else if (option.textContent === "Supplier") {
                clearTable();
                populateSupplier();
                userType = 4;
            }
        }
    });
}
clearTable();
populateAdmin();

var userType = document.querySelector('.upper-table h1');

var tableBody = document.querySelector('tbody');
var rows = tableBody.querySelectorAll('tr');

var btnremove = document.querySelector('.pop-remove');
var btnsave = document.querySelector('.pop-save');

var popup = document.querySelector('.popup');
var pophead = document.querySelector('.pop-head h1');
var popupHidePass = document.querySelector('.div-pass span');

var selectedrow = document.querySelector('.selected-row');

var inputname = document.getElementById('uname');
var inputpass = document.getElementById('psw');
var inputid = document.getElementById('userid');

var userType = 1;

var textContent = '';

// Add click event listener to each row
updateRow(function () {
    document.querySelector('.button-edit').style.display = 'flex';
});

document.querySelector('.pop-exit .close').addEventListener('click', function () {
    popupExit = document.querySelector('.pop-exit .close');
    popup.style.display = "none"
});

// Add click event listener to the 'Add' button
document.querySelector('.add').addEventListener('click', function () {
    // Clear the form
    inputname.value = '';
    inputpass.value = '';
    inputid.value = '';
    pophead.textContent = "Add User";
    btnremove.style.display = 'none';
    var container = document.querySelector('.pop-container');
    var userIdHeading = Array.from(container.querySelectorAll('h1')).find(h1 => h1.textContent === 'USER ID');
    userIdHeading.style.display = 'none';
    inputid.style.display = 'none';
    btnsave.style.width = '100%';
    popup.style.display = 'flex';
    if (popup.classList.contains('show')) {
        popup.classList.remove('show');
        popup.classList.add('hide');
    } else {
        popup.classList.remove('hide');
        popup.classList.add('show');
    }
});

// Add click event listener to the 'Edit' button
document.querySelector('.button-edit').addEventListener('click', function () {
    selectedrow = document.querySelector('.selected-row');
    inputname.value = selectedrow.cells[1].textContent;
    inputpass.value = selectedrow.cells[3].id;
    inputid.value = selectedrow.cells[2].textContent;
    var container = document.querySelector('.pop-container');
    var userIdHeading = Array.from(container.querySelectorAll('h1')).find(h1 => h1.textContent === 'USER ID');
    userIdHeading.style.display = 'flex';
    inputid.style.display = 'flex';
    pophead.textContent = "Edit User";
    btnremove.style.display = 'flex';
    btnsave.style.width = '40%';
    popup.style.display = 'flex';
    if (popup.classList.contains('show')) {
        popup.classList.remove('show');
        popup.classList.add('hide');
    } else {
        popup.classList.remove('hide');
        popup.classList.add('show');
    }
});

// Add click event listener to the 'Save' button
document.querySelector('.pop-save').addEventListener('click', function () {

    // Get form values
    const username = inputname.value;
    const password = inputpass.value;
    const userid = inputid.value;

    updateUser(userid, username, password);

    spanhide = document.createElement("span");
    spanhide.className = "material-symbols-outlined";
    spanhide.textContent = "visibility_off";

    // Clear the form
    inputname.value = '';
    inputpass.value = '';
    inputid.value = '';

    // Close the popup
    document.querySelector('.popup').style.display = 'none';

    if (pophead.textContent === "Edit User") {
        icon = selectedrow.querySelector('.material-symbols-outlined');
        selectedrow.cells[1].textContent = username;
        selectedrow.cells[2].textContent = userid;
        selectedrow.cells[3].textContent = password;
        selectedrow.cells[3].id = password;
        if (icon.textContent === "visibility") {
            spanhide.textContent = "visibility";
        } else {
            spanhide.textContent = "visibility_off";
            selectedrow.cells[3].textContent = '*'.repeat(password.length);
        }
    } else {
        const createdUserid = addUser(username, password);
        // Create a new row and append it to the table
        const row = tableBody.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        cell1.innerHTML = tableBody.rows.length;
        cell2.innerHTML = username;
        cell3.innerHTML = createdUserid;
        cell4.innerHTML = password;
        cell5.appendChild(spanhide);
        rows = tableBody.querySelectorAll('tr');

        updateRow(function () {
            document.querySelector('.button-edit').style.display = 'flex';
        });

        const passCell = row.cells[3];
        const showpassSpan = row.querySelector('.material-symbols-outlined');
        showpassSpan.textContent = "visibility_off";
        passCell.id = passCell.textContent;
        passCell.textContent = '*'.repeat(passCell.id.length);

        showpassSpan.addEventListener('click', function (event) {
            if (showpassSpan.textContent === "visibility_off") {
                showpassSpan.textContent = "visibility";
                passCell.textContent = passCell.id;
            } else {
                showpassSpan.textContent = "visibility_off";
                passCell.textContent = '*'.repeat(passCell.id.length);
            }

        });

    }

});

// Add click event listener to the 'Remove' button
document.querySelector('.pop-remove').addEventListener('click', function () {
    selectedrow = document.querySelector('.selected-row');

    const userid = inputid.value;
    removeUser(userid);

    if (selectedrow) {
        selectedrow.parentNode.removeChild(selectedrow);
    }
    selectedrow.classList.remove('selected-row');

    // Clear the form
    inputname.value = '';
    inputpass.value = '';
    inputid.value = '';

    // Close the popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.button-edit').style.display = 'none';

    rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        row.cells[0].textContent = row.rowIndex;
    });
});

document.querySelector('.button-filter').addEventListener('click', function () {

    btnFilter = document.querySelector('.button-filter');
    if (btnFilter.classList.contains('filter-on')) {
        btnFilter.classList.remove('filter-on');
        sortTable(0);
    } else {
        btnFilter.classList.add('filter-on');
        sortTable(1);
    }
});

document.querySelector('.div-pass span').addEventListener('click', function () {
    if (popupHidePass.textContent === "visibility") {
        popupHidePass.textContent = "visibility_off";
        inputpass.type = "password";
    } else {
        popupHidePass.textContent = "visibility";
        inputpass.type = "text";
    }

});

// SEARCH FUNCTION
function searchFunc() {
    var input, filter, table, tr, td, i, txtValue;
    document.querySelector('.button-edit').style.display = 'none';
    slctd = document.querySelector('.selected-row');
    if (slctd) {
        slctd.classList.remove('selected-row');
    }
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = tableBody;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function updateRow(callback) {
    // Add click event listener to each row
    rows.forEach(row => {
        row.addEventListener('click', function (event) {
            // Remove 'selected-row' class from all rows
            rows.forEach(row => {
                row.classList.remove('selected-row');
            });
            // Add 'selected-row' class to the clicked row
            row.classList.add('selected-row');
            // Execute the callback function
            if (typeof callback === 'function') {
                callback();
            }
        });
    });
}

function hidePassFunc() {
    rows.forEach(row => {
        const passCell = row.cells[3];

        const showpassSpan = row.querySelector('.material-symbols-outlined');
        showpassSpan.textContent = "visibility_off";
        passCell.id = passCell.textContent;
        passCell.textContent = '*'.repeat(passCell.id.length);

        showpassSpan.addEventListener('click', function (event) {
            if (showpassSpan.textContent === "visibility_off") {
                showpassSpan.textContent = "visibility";
                passCell.textContent = passCell.id;
            } else {
                showpassSpan.textContent = "visibility_off";
                passCell.textContent = '*'.repeat(passCell.id.length);
            }
        });
    });
}

function sortTable(columnNo) {

    const rows = Array.from(tableBody.querySelectorAll("tr"));
    rows.sort((rowA, rowB) => {
        const nameA = rowA.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
        const nameB = rowB.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));
}

function populateSupplier() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/suppliers", false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => a.id - b.id);
                let userCounter = 1;
                data.forEach(item => {
                    const userID = item.id;
                    const userName = item.name;
                    const userPassword = item.password;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    const counterCell = document.createElement('td');
                    counterCell.textContent = userCounter;
                    row.appendChild(counterCell);

                    // Create and append td elements for each cell in the row
                    const nameCell = document.createElement('td');
                    nameCell.textContent = userName;
                    row.appendChild(nameCell);

                    const idCell = document.createElement('td');
                    idCell.textContent = userID;
                    row.appendChild(idCell);

                    const passwordCell = document.createElement('td');
                    passwordCell.textContent = '*'.repeat(userPassword.length); // Mask password by default
                    passwordCell.id = userPassword; // Store the actual password in the id attribute
                    row.appendChild(passwordCell);

                    const eyeCell = document.createElement('td');

                    var spanElement = document.createElement("span");
                    spanElement.classList.add("material-symbols-outlined");
                    spanElement.textContent = "visibility_off";
                    eyeCell.appendChild(spanElement);
                    row.appendChild(eyeCell);

                    // Append the row to the table body
                    document.querySelector('.user-table tbody').appendChild(row);

                    // Attach event listener for password visibility toggle
                    spanElement.addEventListener('click', function () {
                        if (spanElement.textContent === "visibility_off") {
                            spanElement.textContent = "visibility";
                            passwordCell.textContent = userPassword;
                        } else {
                            spanElement.textContent = "visibility_off";
                            passwordCell.textContent = '*'.repeat(userPassword.length);
                        }
                    });

                    // Attach event listener for row selection
                    row.addEventListener('click', function () {
                        // Remove 'selected-row' class from all rows
                        const allRows = document.querySelectorAll('.user-table tbody tr');
                        allRows.forEach(r => r.classList.remove('selected-row'));

                        // Add 'selected-row' class to the clicked row
                        row.classList.add('selected-row');

                        // Show the edit button
                        document.querySelector('.button-edit').style.display = 'flex';
                    });

                    userCounter++;
                });
            } catch (e) {
                console.error("Failed to parse JSON response: ", e);
            }
        } else {
            console.error("Error product batches: ", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed");
    };
    xhr.send();
}

function populateManager() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/inventoryManagers", false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => a.id - b.id);
                let userCounter = 1;
                data.forEach(item => {
                    const userID = item.id;
                    const userName = item.name;
                    const userPassword = item.password;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    const counterCell = document.createElement('td');
                    counterCell.textContent = userCounter;
                    row.appendChild(counterCell);

                    // Create and append td elements for each cell in the row
                    const nameCell = document.createElement('td');
                    nameCell.textContent = userName;
                    row.appendChild(nameCell);

                    const idCell = document.createElement('td');
                    idCell.textContent = userID;
                    row.appendChild(idCell);

                    const passwordCell = document.createElement('td');
                    passwordCell.textContent = '*'.repeat(userPassword.length); // Mask password by default
                    passwordCell.id = userPassword; // Store the actual password in the id attribute
                    row.appendChild(passwordCell);

                    const eyeCell = document.createElement('td');

                    var spanElement = document.createElement("span");
                    spanElement.classList.add("material-symbols-outlined");
                    spanElement.textContent = "visibility_off";
                    eyeCell.appendChild(spanElement);
                    row.appendChild(eyeCell);

                    // Append the row to the table body
                    document.querySelector('.user-table tbody').appendChild(row);

                    // Attach event listener for password visibility toggle
                    spanElement.addEventListener('click', function () {
                        if (spanElement.textContent === "visibility_off") {
                            spanElement.textContent = "visibility";
                            passwordCell.textContent = userPassword;
                        } else {
                            spanElement.textContent = "visibility_off";
                            passwordCell.textContent = '*'.repeat(userPassword.length);
                        }
                    });

                    // Attach event listener for row selection
                    row.addEventListener('click', function () {
                        // Remove 'selected-row' class from all rows
                        const allRows = document.querySelectorAll('.user-table tbody tr');
                        allRows.forEach(r => r.classList.remove('selected-row'));

                        // Add 'selected-row' class to the clicked row
                        row.classList.add('selected-row');

                        // Show the edit button
                        document.querySelector('.button-edit').style.display = 'flex';
                    });

                    userCounter++;
                });
            } catch (e) {
                console.error("Failed to parse JSON response: ", e);
            }
        } else {
            console.error("Error product batches: ", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed");
    };
    xhr.send();
}

function populateAdmin() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/admins", false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => a.id - b.id);
                let userCounter = 1;
                data.forEach(item => {
                    const userID = item.id;
                    const userName = item.name;
                    const userPassword = item.password;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    const counterCell = document.createElement('td');
                    counterCell.textContent = userCounter;
                    row.appendChild(counterCell);

                    // Create and append td elements for each cell in the row
                    const nameCell = document.createElement('td');
                    nameCell.textContent = userName;
                    row.appendChild(nameCell);

                    const idCell = document.createElement('td');
                    idCell.textContent = userID;
                    row.appendChild(idCell);

                    const passwordCell = document.createElement('td');
                    passwordCell.textContent = '*'.repeat(userPassword.length); // Mask password by default
                    passwordCell.id = userPassword; // Store the actual password in the id attribute
                    row.appendChild(passwordCell);

                    const eyeCell = document.createElement('td');

                    var spanElement = document.createElement("span");
                    spanElement.classList.add("material-symbols-outlined");
                    spanElement.textContent = "visibility_off";
                    eyeCell.appendChild(spanElement);
                    row.appendChild(eyeCell);

                    // Append the row to the table body
                    document.querySelector('.user-table tbody').appendChild(row);

                    // Attach event listener for password visibility toggle
                    spanElement.addEventListener('click', function () {
                        if (spanElement.textContent === "visibility_off") {
                            spanElement.textContent = "visibility";
                            passwordCell.textContent = userPassword;
                        } else {
                            spanElement.textContent = "visibility_off";
                            passwordCell.textContent = '*'.repeat(userPassword.length);
                        }
                    });

                    // Attach event listener for row selection
                    row.addEventListener('click', function () {
                        // Remove 'selected-row' class from all rows
                        const allRows = document.querySelectorAll('.user-table tbody tr');
                        allRows.forEach(r => r.classList.remove('selected-row'));

                        // Add 'selected-row' class to the clicked row
                        row.classList.add('selected-row');

                        // Show the edit button
                        document.querySelector('.button-edit').style.display = 'flex';
                    });

                    userCounter++;
                });
            } catch (e) {
                console.error("Failed to parse JSON response: ", e);
            }
        } else {
            console.error("Error product batches: ", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed");
    };
    xhr.send();
}

function populateCustomer() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/customers", false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => a.id - b.id);
                let userCounter = 1;
                data.forEach(item => {
                    const userID = item.id;
                    const userName = item.name;
                    const userPassword = item.password;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    const counterCell = document.createElement('td');
                    counterCell.textContent = userCounter;
                    row.appendChild(counterCell);

                    // Create and append td elements for each cell in the row
                    const nameCell = document.createElement('td');
                    nameCell.textContent = userName;
                    row.appendChild(nameCell);

                    const idCell = document.createElement('td');
                    idCell.textContent = userID;
                    row.appendChild(idCell);

                    const passwordCell = document.createElement('td');
                    passwordCell.textContent = '*'.repeat(userPassword.length); // Mask password by default
                    passwordCell.id = userPassword; // Store the actual password in the id attribute
                    row.appendChild(passwordCell);

                    const eyeCell = document.createElement('td');

                    var spanElement = document.createElement("span");
                    spanElement.classList.add("material-symbols-outlined");
                    spanElement.textContent = "visibility_off";
                    eyeCell.appendChild(spanElement);
                    row.appendChild(eyeCell);

                    // Append the row to the table body
                    document.querySelector('.user-table tbody').appendChild(row);

                    // Attach event listener for password visibility toggle
                    spanElement.addEventListener('click', function () {
                        if (spanElement.textContent === "visibility_off") {
                            spanElement.textContent = "visibility";
                            passwordCell.textContent = userPassword;
                        } else {
                            spanElement.textContent = "visibility_off";
                            passwordCell.textContent = '*'.repeat(userPassword.length);
                        }
                    });

                    // Attach event listener for row selection
                    row.addEventListener('click', function () {
                        // Remove 'selected-row' class from all rows
                        const allRows = document.querySelectorAll('.user-table tbody tr');
                        allRows.forEach(r => r.classList.remove('selected-row'));

                        // Add 'selected-row' class to the clicked row
                        row.classList.add('selected-row');

                        // Show the edit button
                        document.querySelector('.button-edit').style.display = 'flex';
                    });

                    userCounter++;
                });
            } catch (e) {
                console.error("Failed to parse JSON response: ", e);
            }
        } else {
            console.error("Error product batches: ", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed");
    };
    xhr.send();
}

function removeUser(userID) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/api/admins/${userID}`, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request was successful
            console.log(xhr.responseText);
        } else {
            // Request failed
            console.error("Request failed with status:", xhr.status);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed");
    };
    xhr.send();
}

function updateUser(userID, userName, userPassword){
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/api/admins/${userID}`, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request was successful
            console.log(xhr.responseText);
        } else {
            // Request failed
            console.error("Request failed with status:", xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Request failed");
    };

    var data = {
        name: userName,
        password: userPassword
    };

    var json = JSON.stringify(data);

    xhr.send(json);
}


function addUser(username, password){
    const xhr = new XMLHttpRequest();

    if (userType === 1){
        xhr.open("POST", `/api/admins`, false);
    }

    else if (userType === 2){
        xhr.open("POST", `/api/inventoryManagers`, false);
    }

    else if (userType === 3){
        xhr.open("POST", `/api/customers`, false);
    }

    else if (userType === 4){
        xhr.open("POST", `/api/suppliers`, false);
    }


    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onerror = function () {
        console.error("Request failed");
    };

    var data = {
        name: username,
        password: password,
        ROLE: userType
    };

    var json = JSON.stringify(data);

    xhr.send(json);

    if (xhr.status >= 200 && xhr.status < 300) {
        // Request was successful
        const data = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        return data.id;
    } else {
        // Request failed
        console.error("Request failed with status:", xhr.status);
    }
}

function clearTable() {
    var tbody = document.querySelector("tbody");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}