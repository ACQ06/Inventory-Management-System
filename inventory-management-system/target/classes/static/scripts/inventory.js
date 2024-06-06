async function DisplayData() {
    try {

        const [supplierData, productData, productBatchData] = await Promise.all([
            fetch('http://localhost:8080/api/suppliers').then(response => response.json()),
            fetch('http://localhost:8080/api/products').then(response => response.json()),
            fetch('http://localhost:8080/api/productBatches').then(response => response.json()),
        ]);

        const productMap = new Map();
        productData.forEach(product => productMap.set(product.id, product.name));

        // Populate "stocks" table
        const stocksTableBody = document.getElementById('stocks').getElementsByTagName('tbody')[0];
        productData.forEach(item => {
            const row = stocksTableBody.insertRow();
            const cells = [item.name, item.quantity];
            cells.push(item.quantity === 0 ? 'Out of stock' : item.quantity <= 10 ? 'Low stock count' : 'Available');
            cells.forEach((content, index) => row.insertCell(index).textContent = content);
        });

        // Populate "products" table
        const productsTableBody = document.getElementById('products').getElementsByTagName('tbody')[0];
        productData.forEach(item => {
            const row = productsTableBody.insertRow();
            const cells = [item.id, item.name, item.supplierId, item.price, item.quantity];
            cells.forEach((content, index) => row.insertCell(index).textContent = content);
        });

        // Populate "productBatches" table
        const productBatchesTableBody = document.getElementById('productBatches').getElementsByTagName('tbody')[0];
        productBatchData.forEach(item => {
            const row = productBatchesTableBody.insertRow();
            const cells = [item.id, item.productId, productMap.get(item.productId), item.quantity];
            const expirationDate = new Date(item.expiration); // Assuming price holds the timestamp
            cells.push(expirationDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
            cells.forEach((content, index) => row.insertCell(index).textContent = content);
        });

        console.log('All data fetched successfully!');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the DisplayData function on window load
window.onload = DisplayData;

async function addProduct() {
    try {
        const prodName = document.getElementById('prodName').value;
        const supplierID = document.getElementById('supplierID').value;
        const priceColumn = document.getElementById('priceColumn').value;
        const quantityCol = document.getElementById('quantityCol').value;

        const productData = {
            name: prodName,
            supplierId: supplierID,
            price: priceColumn,
            quantity: quantityCol
        };

        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            console.log('Product added successfully!');
            // Reload or update the product list after adding
            DisplayData();
        } else {
            console.error('Error adding product:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}










