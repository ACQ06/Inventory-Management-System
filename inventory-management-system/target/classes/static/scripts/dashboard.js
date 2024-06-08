function getDaysUntilExpiry(itemExpiryDate) {
    // Parse the item's expiry date string into a Date object
    const expiryDate = new Date(itemExpiryDate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference between expiry date and current date in milliseconds
    const differenceMs = expiryDate - currentDate;

    // Convert milliseconds to days
    const daysUntilExpiry = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return daysUntilExpiry;
}

function getProductName(productID) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/products/${productID}`, false);
    xhr.send();

    if (xhr.status === 200){
        const product = JSON.parse(xhr.responseText);
        return product.name
    } else {
        console.error("Error getting product details: ", xhr.statusText);
        return null;
    }
}

function getManagerName(managerID){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/inventoryManagers/${managerID}`, false);
    xhr.send();

    if (xhr.status === 200){
        const manager = JSON.parse(xhr.responseText);
        return manager.name
    } else {
        console.error("Error getting product details: ", xhr.statusText);
        return null;
    }
}

function populateTransactionTable() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/purchaseOrders", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
                // Assuming data is an array
                data.forEach(item => {
                    const transactionID = item.id;
                    const userID = item.managerId;
                    const userName = getManagerName(userID);
                    const transactionDate = item.date;x``

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    // Create and append td elements for each cell in the row
                    const transactionIDCell = document.createElement('td');
                    transactionIDCell.textContent = transactionID;
                    row.appendChild(transactionIDCell);

                    const managerNameCell = document.createElement('td');
                    managerNameCell.textContent = userName;
                    row.appendChild(managerNameCell);

                    const transactionTypeCell = document.createElement('td');
                    transactionTypeCell.textContent = "Purchase Order";
                    row.appendChild(transactionTypeCell);

                    const transactionDateCell = document.createElement('td');
                    transactionDateCell.textContent = transactionDate;
                    row.appendChild(transactionDateCell);

                    // Append the row to the table body
                    document.querySelector('.transaction-table tbody').appendChild(row);
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

    xhr.open("GET", "/api/salesOrders", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
                // Assuming data is an array
                data.forEach(item => {
                    const transactionID = item.id;
                    const userID = item.managerId;
                    const userName = getManagerName(userID);
                    const transactionDate = item.date;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    // Create and append td elements for each cell in the row
                    const transactionIDCell = document.createElement('td');
                    transactionIDCell.textContent = transactionID;
                    row.appendChild(transactionIDCell);

                    const managerNameCell = document.createElement('td');
                    managerNameCell.textContent = userName;
                    row.appendChild(managerNameCell);

                    const transactionTypeCell = document.createElement('td');
                    transactionTypeCell.textContent = "Sales Order";
                    row.appendChild(transactionTypeCell);

                    const transactionDateCell = document.createElement('td');
                    transactionDateCell.textContent = transactionDate;
                    row.appendChild(transactionDateCell);

                    // Append the row to the table body
                    document.querySelector('.transaction-table tbody').appendChild(row);
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
}

function populateBatchTable() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/productBatches", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                data.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
                // Assuming data is an array
                data.forEach(item => {
                    const itemExpiryDate = getDaysUntilExpiry(item.expiration);

                    if (itemExpiryDate > 365) {
                        return;
                    }

                    const itemID = item.productId;
                    const itemName = getProductName(itemID);
                    const itemQuantity = item.quantity;
                    const itemBatch = item.id;

                    // Create a new row (tr element)
                    const row = document.createElement('tr');

                    // Create and append td elements for each cell in the row
                    const expiresCell = document.createElement('td');
                    expiresCell.textContent = `In ${itemExpiryDate} Days`;
                    row.appendChild(expiresCell);

                    const batchNumberCell = document.createElement('td');
                    batchNumberCell.textContent = itemBatch;
                    row.appendChild(batchNumberCell);

                    const productCell = document.createElement('td');
                    productCell.textContent = itemName;
                    row.appendChild(productCell);

                    const quantityCell = document.createElement('td');
                    quantityCell.textContent = itemQuantity;
                    row.appendChild(quantityCell);

                    // Append the row to the table body
                    document.querySelector('.batch-table tbody').appendChild(row);
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
}

function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}

function customerCount(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/customers", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const numberOfPOs = response.length;
            const customerCountElement = document.querySelector('.customer-count .value');
            customerCountElement.textContent = formatNumber(numberOfPOs);
        }
    }
}

function poCount(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/purchaseOrders", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const numberOfPOs = response.length;
            const stockCountElement = document.querySelector('.created-po .value');
            stockCountElement.textContent = formatNumber(numberOfPOs);
        }
    }
}

function stockCount() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/products", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                let totalStocks = 0;
                data.forEach(item => {
                    totalStocks += item.quantity;
                });

                // For example, if the second card is the one you want to target:
                const stockCountElement = document.querySelector('.available-stocks .value');
                stockCountElement.textContent = formatNumber(totalStocks);
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
}

function salesRevenueCount() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/salesOrders", false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                let totalRevenue = 0;
                data.forEach(item => {
                    totalRevenue += item.totalValue;
                });
                const revenueCountElement = document.querySelector('.sales-revenue .value');
                revenueCountElement.textContent = formatNumber(totalRevenue);
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
}

function loadDashboard() {
    customerCount();
    stockCount();
    poCount();
    salesRevenueCount();
    populateTransactionTable();
    populateBatchTable();
}

document.addEventListener('DOMContentLoaded', loadDashboard);