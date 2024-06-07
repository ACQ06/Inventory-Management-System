// Fetch and display all necessary data on page load
window.onload = () => {
    DisplayData();
    fetchAndDisplayStocks();
};

// Variables to manage state
let productsData = [];
let isAscending = true;

// Function to display data fetched from API
async function DisplayData() {
    try {
        const [supplierData, productData, productBatchData] = await Promise.all([
            fetch('http://localhost:8080/api/suppliers').then(response => response.json()),
            fetch('http://localhost:8080/api/products').then(response => response.json()),
            fetch('http://localhost:8080/api/productBatches').then(response => response.json())
        ]);

        const productMap = new Map();
        productData.forEach(product => productMap.set(product.id, product.name));

        populateStocksTable(productData);
        populateProductsTable(productData);
        populateProductBatchesTable(productBatchData, productMap);

        console.log('All data fetched successfully!');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate stocks table
function populateStocksTable(productData) {
    const stocksTableBody = document.getElementById('stocks').getElementsByTagName('tbody')[0];
    stocksTableBody.innerHTML = '';

    productData.forEach(item => {
        const row = stocksTableBody.insertRow();
        const cells = [item.name, item.quantity];
        cells.push(item.quantity === 0 ? 'Out of stock' : item.quantity <= 10 ? 'Low stock count' : 'Available');
        cells.forEach((content, index) => row.insertCell(index).textContent = content);
    });
}

// Function to populate products table
function populateProductsTable(productData) {
    const productsTableBody = document.getElementById('products').getElementsByTagName('tbody')[0];
    productsTableBody.innerHTML = '';

    productData.forEach(item => {
        const row = productsTableBody.insertRow();
        row.dataset.productId = item.id; // Set the data-product-id attribute to the product ID
        const cells = [item.id, item.name, item.supplierId, item.price, item.quantity];
        cells.forEach((content, index) => row.insertCell(index).textContent = content);
    });
}


// Function to populate product batches table
function populateProductBatchesTable(productBatchData, productMap) {
    const productBatchesTableBody = document.getElementById('productBatches').getElementsByTagName('tbody')[0];
    productBatchesTableBody.innerHTML = '';

    productBatchData.forEach(item => {
        const row = productBatchesTableBody.insertRow();
        const cells = [item.id, item.productId, productMap.get(item.productId), item.quantity];
        const expirationDate = new Date(item.expiration);
        cells.push(expirationDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
        cells.forEach((content, index) => row.insertCell(index).textContent = content);
    });
}

// Function to fetch and display stocks
async function fetchAndDisplayStocks() {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        productsData = await response.json();
        displayStocks(productsData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Function to display stocks in the table
function displayStocks(data) {
    const tableBody = document.getElementById('stocks').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(product => {
        const row = tableBody.insertRow();
        const availability = product.quantity === 0 ? 'Out of stock' : product.quantity <= 10 ? 'Low stock count' : 'Available';
        const cells = [product.name, product.quantity, availability];
        cells.forEach((content, index) => {
            const cell = row.insertCell(index);
            cell.textContent = content;
        });
    });
}

// Function to sort table by the "Remaining" column
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch, switchCount = 0;
    table = document.querySelector(".inventory-table");
    switching = true;
    var direction = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];

            if (direction === "asc") {
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction === "desc") {
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && direction === "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
}

// Optional: Toggle search input visibility
function toggleSearchInput(inputId) {
    const input = document.getElementById(inputId);
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
        input.focus();
    } else {
        input.classList.add('hidden');
    }
}

// Function to add a new product
async function addProduct() {
    const prodName = document.getElementById('prodName').value;
    const supplierID = document.getElementById('supplierID').value;
    const priceColumn = document.getElementById('priceColumn').value;
    const quantityCol = document.getElementById('quantityCol').value;

    const newProduct = {
        supplierId: supplierID,
        name: prodName,
        price: parseFloat(priceColumn), // Ensure price is a number
        quantity: parseInt(quantityCol) // Ensure quantity is a number
    };

    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            console.log('Product added successfully!');
            window.location.href = "/inventory"; // Redirect or refresh the page
        } else {
            console.error('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

async function updateProduct(productId, updatedData) {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`Failed to update product with ID ${productId}`);
        }
    } catch (error) {
        throw error;
    }
}



function editProduct(button) {
    const row = button.closest('tr');
    const productId = row.dataset.productId; // Retrieve product ID from data attribute

    const cells = row.querySelectorAll('td:not(.action-buttons)'); // Exclude the action buttons cell

    if (row.classList.contains('editing')) {
        // Save changes
        const updatedProduct = {}; // Object to store updated product data
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            if (input) {
                const columnName = cell.dataset.column; // Get the column name from data-column attribute
                updatedProduct[columnName] = input.value; // Update the corresponding property in the updatedProduct object
                cell.textContent = input.value;
            }
        });

        // Make PUT request to update the product
        updateProduct(productId, updatedProduct)
            .then(() => {
                console.log('Product updated successfully!');
                button.textContent = 'Edit';
                row.classList.remove('editing');
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    } else {
        // Enable editing
        cells.forEach(cell => {
            const text = cell.textContent;
            const input = document.createElement('input');
            input.style.width = '100%'; // Ensure input width is 100% of the cell
            input.value = text;
            cell.textContent = '';
            cell.appendChild(input);
        });
        button.textContent = 'Save';
        row.classList.add('editing');
    }
}

async function addBatch() {
    try {
        // Retrieve form input values
        const productID = document.getElementById('productID').value;
        const quantityColumn = document.getElementById('quantityColumn').value;
        const expirationDate = document.getElementById('expirationDate').value;

        // Validate expiration date format (optional)
        // You can add logic here to ensure the expiration date is in the expected format (e.g., YYYY-MM-DD)

        // Find the latest batch ID (assuming backend logic retrieves and increments it)
        // This part doesn't require a separate API call on the frontend
        let latestBatchID = null; // Replace with logic to access the retrieved max ID on the backend

        // Create the batch object with the incremented ID
        const batch = {
            id: latestBatchID + 1, // Use the incremented ID for "id" property
            productId: productID,
            expiration: expirationDate,
            quantity: parseInt(quantityColumn), // Ensure quantity is a number
        };

        // Perform the POST request to add the batch
        const addBatchResponse = await fetch('http://localhost:8080/api/productBatches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(batch),
        });

        if (addBatchResponse.ok) {
            console.log('Batch added successfully!');
            // ... update local storage or UI if needed ...
            // Consider redirecting to the inventory page after successful addition:
            // window.location.href = "/inventory";
        } else {
            console.error('Failed to add batch:', addBatchResponse.status);
        }
    } catch (error) {
        console.error('Error adding batch:', error);
    }
}











