var prdTableBody = document.querySelector('.product tbody');
var prdRows = prdTableBody.querySelectorAll('tr');

var ordTableBody = document.querySelector('.order tbody');
var ordRows = ordTableBody.querySelectorAll('tr');

document.querySelector('.co-filter').addEventListener('click', function () {

    btnFilter = document.querySelector('.co-filter');
    if (btnFilter.classList.contains('filter-on')) {
        btnFilter.classList.remove('filter-on');
        sortTable(0);
    } else {
        btnFilter.classList.add('filter-on');
        sortTable(1);
    }
});

// SEARCH FUNCTION
function searchFunc() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = prdTableBody;
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

updateRow();
function updateRow() {
    // Add click event listener to each row
    prdRows.forEach(row => {
        addQuantity = row.cells[6].querySelector(".add-quantity");
        addQuantity.addEventListener('click', function (event) {
            let qntty = parseFloat(row.cells[5].textContent);
            let stock = parseFloat(row.cells[3].textContent);
            if (qntty < stock) {
                qntty++;
                row.cells[5].textContent = qntty;
                updateOrder(row, qntty);
            }
        });
        removeQuantity = row.cells[6].querySelector(".remove-quantity");
        removeQuantity.addEventListener('click', function (event) {
            let qntty = parseFloat(row.cells[5].textContent);
            if (qntty > 0) {
                qntty--;
                row.cells[5].textContent = qntty;
                updateOrder(row, qntty);
            }
        });
    });
}

function updateOrder(row, qntty) {
    let quantity = parseFloat(row.cells[5].textContent);
    let condition = true;
    var totalPrice = 0;
    ordRows = ordTableBody.querySelectorAll('tr');
    ordRows.forEach(ordRow => {
        if (row.cells[1].textContent === ordRow.cells[1].textContent) {
            ordRow.cells[2].textContent = qntty;
            condition = false;
            var price = row.cells[4].textContent;
            var priceReg = price.replace(/[^0-9\-+\.]/g, "");
            var priceFinal = parseFloat(priceReg);
            priceFinal = priceFinal * qntty;
            priceFinal = `${priceFinal.toFixed(2)}`;
            ordRow.cells[3].textContent = '₱' + priceFinal;
        }
        if (parseFloat(ordRow.cells[2].textContent) === 0) {
            ordRow.parentNode.removeChild(ordRow);
            rowUpdates = ordTableBody.querySelectorAll('tr');
            rowUpdates.forEach(rowUpdate => {
                rowUpdate.cells[0].textContent = rowUpdate.rowIndex;
            });
        }
    });
    if (quantity > 0 && condition === true) {
        const insertRow = ordTableBody.insertRow(-1);
        const cell1 = insertRow.insertCell(0);
        const cell2 = insertRow.insertCell(1);
        const cell3 = insertRow.insertCell(2);
        const cell4 = insertRow.insertCell(3);
        cell1.innerHTML = ordTableBody.rows.length;
        cell2.innerHTML = row.cells[1].textContent;
        cell3.innerHTML = row.cells[5].textContent;
        cell4.innerHTML = row.cells[4].textContent;
    }

    ordRows = ordTableBody.querySelectorAll('tr');
    ordRows.forEach(ordRow => {
        var price = ordRow.cells[3].textContent;
        var priceReg = price.replace(/[^0-9\-+\.]/g, "");
        var priceFinal = parseFloat(priceReg);
        totalPrice = totalPrice + parseFloat(priceFinal);
    });
    totalPrice = `${totalPrice.toFixed(2)}`;
    document.getElementById('total-price').textContent = '₱' + totalPrice;
    document.getElementById('total-items').textContent = ordTableBody.rows.length;
}

function sortTable(columnNo) {

    const rows = Array.from(prdTableBody.querySelectorAll("tr"));
    rows.sort((rowA, rowB) => {
        const nameA = rowA.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
        const nameB = rowB.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    prdTableBody.innerHTML = "";
    rows.forEach(row => prdTableBody.appendChild(row));
}

function populateProductTable() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/products", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
                // Assuming data is an array
                var itemCounter = 1
                data.forEach(item => {
                    const itemName = item.name;
                    const itemID = item.id;
                    const itemStock = item.quantity;
                    const itemPrice = item.price;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    // Create and append td elements for each cell in the row
                    const itemCounterCell = document.createElement('td');
                    itemCounterCell.textContent = itemCounter;
                    row.appendChild(itemCounterCell);

                    const itemNameCell = document.createElement('td');
                    itemNameCell.textContent = itemName;
                    row.appendChild(itemNameCell);

                    const itemIDCell = document.createElement('td');
                    itemIDCell.textContent = itemID;
                    row.appendChild(itemIDCell);

                    const itemStockCell = document.createElement('td');
                    itemStockCell.textContent = itemStock;
                    row.appendChild(itemStockCell);

                    const itemPriceCell = document.createElement('td');
                    itemPriceCell.textContent = `₱${itemPrice}`;
                    row.appendChild(itemPriceCell);

                    const itemQuantityCell = document.createElement('td');
                    itemQuantityCell.textContent = 0;
                    row.appendChild(itemQuantityCell);

                    var tdElement = document.createElement("td");

                    var addSpan = document.createElement("span");
                    addSpan.className = "material-symbols-outlined add-quantity";
                    addSpan.textContent = "add";

                    var removeSpan = document.createElement("span");
                    removeSpan.className = "material-symbols-outlined remove-quantity";
                    removeSpan.textContent = "remove";

                    tdElement.appendChild(addSpan);
                    tdElement.appendChild(removeSpan);
                    row.append(tdElement);

                    // Append the row to the table body
                    document.querySelector('.user-table tbody').appendChild(row);

                    itemCounter++;
                });
            } catch (e) {
                console.error("Failed to parse JSON response: ", e);
            }
        } else {
            console.error("Error product batches: ", xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error("Request failed");
    };
    xhr.send();
    // Update prdRows with all rows of the product table
    prdRows = prdTableBody.querySelectorAll('tr');
    updateRow();
}

function addCustomerOrder() {
    const trElements = document.querySelectorAll('.order-table .order-table-hold .user-table tbody tr');

    var totalPrice = 0;
    const itemsArray = [];
    const itemCountArray = [];
    const priceArray = [];

    trElements.forEach(tr => {
        const tdElements = tr.querySelectorAll('td');
        tdElements.forEach((td, index) => {
            if (index === 1){
                itemsArray.push(td.textContent);
            }

            else if (index === 2){
                const numericString = td.textContent.replace(/[^\d.]/g, '');
                itemCountArray.push(parseInt(numericString));
            }

            else if (index === 3){
                const numericString = td.textContent.replace(/[^\d.]/g, '');
                const price = parseFloat(numericString); // Parse as float to preserve decimals
                priceArray.push(price);
                totalPrice += price;
            }
        });
    });

    var data = {
        customer_id: 1,
        itemList: itemsArray,
        itemCount: itemCountArray,
        priceList: priceArray,
        totalValue: totalPrice
    };

    var json = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/customerOrders`, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onerror = function () {
        console.error("Request failed");
    };
    xhr.send(json);

    if (xhr.status >= 200 && xhr.status < 300) {
        // Request was successful
        const data = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        clearTable();
    } else {
        // Request failed
        console.error("Request failed with status:", xhr.status);
    }
}

function clearTable(){
    var table = document.querySelector('.user-table.order');

    if (table) {
        var tbody = table.querySelector('tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }

}

document.addEventListener('DOMContentLoaded', populateProductTable);