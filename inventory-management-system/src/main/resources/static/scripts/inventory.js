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

        // Add action cell for edit/delete buttons
        const actionCell = row.insertCell(-1);
        actionCell.classList.add('action-buttons');
        actionCell.classList.add('hidden');
        actionCell.innerHTML = `
            <button class="edit-btn" onclick="enableEditing(this.parentElement.parentElement, ${item.id})">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(${item.id})">Delete</button>
        `;
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

function enableProductEditing() {
    const actionHeader = document.querySelector('.inventory-table2 .action-header');
    const rows = document.querySelectorAll('.inventory-table2 tbody tr');
    const editButton = document.getElementById('ProductListEditButton');

    // Toggle the visibility of the action header
    if (actionHeader) {
        actionHeader.classList.toggle('hidden');
    }

    rows.forEach(row => {
        let actionCell = row.querySelector('.action-buttons');
        if (!actionCell) {
            actionCell = document.createElement('td');
            actionCell.classList.add('action-buttons');
            actionCell.innerHTML = `
                <button class="edit-btn" onclick="editProduct(this)">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(this)">Delete</button>
            `;
            row.appendChild(actionCell);
        }
        actionCell.classList.toggle('hidden', actionHeader && actionHeader.classList.contains('hidden'));
    });
}

function editProduct(button) {
    const productsTableBody = document.getElementById('products').getElementsByTagName('tbody')[0];
    const rows = productsTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        // If action cell doesn't exist, create it
        let actionCell = row.querySelector('.action-buttons');
        if (!actionCell) {
            actionCell = document.createElement('td');
            actionCell.classList.add('action-buttons');
            row.appendChild(actionCell);

            // Create Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.onclick = () => enableEditing(row, row.dataset.productId);
            actionCell.appendChild(editButton);

            // Create Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => deleteProduct(row.dataset.productId);
            actionCell.appendChild(deleteButton);
        }

        actionCell.classList.remove('hidden');
    });
}


// Function to enable editing of a product row
function enableEditing(row, productId) {
    const cells = row.querySelectorAll('td:not(:last-child)');
    const editButton = row.querySelector('.edit-btn');

    if (row.classList.contains('editing')) {
        // Save changes
        const updatedProduct = {};
        cells.forEach((cell, index) => {
            const input = cell.querySelector('input');
            if (input) {
                const value = input.value;
                cell.textContent = value;

                // Map the input values back to the product properties
                switch (index) {
                    case 0: updatedProduct.id = value; break;
                    case 1: updatedProduct.name = value; break;
                    case 2: updatedProduct.supplierId = value; break;
                    case 3: updatedProduct.price = parseFloat(value); break;
                    case 4: updatedProduct.quantity = parseInt(value); break;
                }
            }
        });

        // Send updated data to backend API
        fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Product updated successfully:', data);
            })
            .catch(error => console.error('Error updating product:', error));

        // Change button text back to 'Edit'
        editButton.textContent = 'Edit';
        row.classList.remove('editing');
    } else {
        // Enable editing
        cells.forEach(cell => {
            const text = cell.textContent;
            const input = document.createElement('input');
            input.value = text;
            cell.textContent = '';
            cell.appendChild(input);
        });

        // Change button text to 'Save'
        editButton.textContent = 'Save';
        row.classList.add('editing');
    }
}


// working
async function deleteBatch(button) {
    try {
        const row = button.closest('tr');
        const batchId = row.cells[0].textContent;

        const response  = await fetch(`http://localhost:8080/api/productBatches/${batchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            console.log('Batch deleted succesfully from the database!');
            row.remove(); //remove from the table
        } else {
            console.error('Error deleting batch:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting the bacth:' , error)
    }
}
function deleteProduct(productId) {
    fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                document.querySelector(`tr[data-product-id="${productId}"]`).remove();
                console.log('Product deleted successfully');
            } else {
                console.error('Error deleting product:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting product:', error));
}


// Function to add a new product
function addProduct() {
    const prodName = document.getElementById('prodName').value.trim();
    const supplierID = document.getElementById('supplierID').value.trim();
    const price = document.getElementById('priceColumn').value.trim();
    const quantity = document.getElementById('quantityCol').value.trim();

    // Validate input data
    if (!prodName || !supplierID || isNaN(price) || isNaN(quantity)) {
        console.error('Invalid input data. Please check the form fields.');
        return;
    }

    const newProduct = {
        name: prodName,
        supplierId: parseInt(supplierID),
        price: parseFloat(price),
        quantity: parseInt(quantity)
    };

    console.log('Sending new product data:', newProduct); // Log the data being sent

    fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(`Error ${response.status}: ${error.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Product added successfully:', data);
            // Add the new product to the table
            const productTable = document.querySelector('#products tbody');
            const newRow = productTable.insertRow();
            newRow.dataset.productId = data.id;

            const cells = [data.id, data.name, data.supplierId, data.price, data.quantity];
            cells.forEach((content, index) => newRow.insertCell(index).textContent = content);

            // Add the edit button to the new row
            const actionCell = newRow.insertCell(-1);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.onclick = () => enableEditing(newRow, data.id);
            actionCell.appendChild(editButton);

            closeModal('productModal');
        })
        .catch(error => console.error('Error adding product:', error.message));
}


// Function to add a new batch
function addBatch() {
    const productID = document.getElementById('productID').value;
    const quantity = document.getElementById('quantityColumn').value;
    // Get the expiration date from the input field
    const expirationDateInput = document.getElementById('expirationDate');
    const expirationDateValue = expirationDateInput.value;

    // Parse the expiration date input value into a Date object
    const expirationDate = new Date(expirationDateValue);

    // Get the timestamp (milliseconds since January 1, 1970)
    const expirationTimestamp = expirationDate.getTime();

    console.log(expirationTimestamp);


    const newBatch = {
        productId: parseInt(productID),
        expirationDate: expirationDate,
        quantity: parseInt(quantity)
    };

    fetch('http://localhost:8080/api/productBatches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBatch)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Batch added successfully:', data);
            DisplayData();
            // Optionally, refresh the product batches table or perform other UI updates here
            // For example: DisplayData(); // If DisplayData() also fetches and updates product batches
            closeModalBatch('batchModal');

        })
        .catch(error => console.error('Error adding batch:', error));
}

function toggleSearchInput(inputId) {
    var input = document.getElementById(inputId);
    input.classList.toggle('hidden');
}

// Function for edit button
function enableBatchEditing() {
    const actionHeader = document.querySelector('.inventory-table3 .action-header');
    const rows = document.querySelectorAll('.inventory-table3 tbody tr');

    if (actionHeader.classList.contains('hidden')) {
        actionHeader.classList.remove('hidden');
        rows.forEach(row => {
            const actionCell = row.insertCell(-1);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.onclick = () => editBatch(row);
            actionCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => deleteBatch(row);
            actionCell.appendChild(deleteButton);
        });
    } else {
        actionHeader.classList.add('hidden');
        rows.forEach(row => row.deleteCell(-1));
    }
}

function editBatch(row) {
    const cells = row.querySelectorAll('td:not(:last-child)');
    const button = row.querySelector('.edit-btn');

    if (row.classList.contains('editing')) {
        // Save changes
        const inputs = row.querySelectorAll('input');
        inputs.forEach((input, index) => {
            const cell = cells[index];
            cell.textContent = input.value;
        });

        // Change button text back to 'Edit'
        button.textContent = 'Edit';
        row.classList.remove('editing');
    } else {
        // Enable editing
        cells.forEach(cell => {
            const text = cell.textContent;
            const input = document.createElement('input');
            input.value = text;
            cell.textContent = '';
            cell.appendChild(input);
        });

        // Change button text to 'Save'
        button.textContent = 'Save';
        row.classList.add('editing');
    }
}



DisplayData();
