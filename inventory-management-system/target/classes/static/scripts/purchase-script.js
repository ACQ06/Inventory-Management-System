document.addEventListener('DOMContentLoaded', function() {
    var tableBody = document.querySelector('tbody');
    var popup = document.querySelector('.popup');
    var pophead = document.querySelector('.pop-head h1');
    var inputItemName = document.getElementById('itemname');
    var inputItemId = document.getElementById('itemid');
    var inputPrice = document.getElementById('price');
    var inputQuantity = document.getElementById('quantity');
    var inputAmount = document.getElementById('amount');

    var btnRemove = document.querySelector('.pop-remove');
    var btnSave = document.querySelector('.pop-save');

    updateRow();

    document.querySelector('.pop-exit .close').addEventListener('click', function() {
        popup.style.display = "none";
    });

    document.querySelector('.button-Icon').addEventListener('click', function() {
        // Clear the form
        inputItemName.value = '';
        inputItemId.value = '';
        inputPrice.value = '';
        inputQuantity.value = '';
       // inputAmount.value = '';
        pophead.textContent = "Add Item";
        btnRemove.style.display = 'none';
        btnSave.style.width = '100%';
        popup.style.display = 'flex';
        togglePopup(popup);
    });

    document.querySelector('.pop-save').addEventListener('click', function() {
        // Get form values
        const itemName = inputItemName.value;
        const itemId = inputItemId.value;
        const itemPrice = inputPrice.value;
        const itemQuantity = inputQuantity.value;
        //const itemAmount = inputAmount.value;

        // Clear the form
        inputItemName.value = '';
        inputItemId.value = '';
        inputPrice.value = '';
        inputQuantity.value = '';
       // inputAmount.value = '';

        // Close the popup
        popup.style.display = 'none';

        if (pophead.textContent === "Edit Purchase Order") {
            selectedRow.cells[0].textContent = itemName;
            selectedRow.cells[1].textContent = itemId;
            selectedRow.cells[2].textContent = itemPrice;
            selectedRow.cells[3].textContent = itemQuantity;
            //selectedRow.cells[4].textContent = itemAmount;
        } else {
            const row = tableBody.insertRow(-1);
            row.insertCell(0).innerHTML = itemName;
            row.insertCell(1).innerHTML = itemId;
            row.insertCell(2).innerHTML = itemPrice;
            row.insertCell(3).innerHTML = itemQuantity;
           // row.insertCell(4).innerHTML = itemAmount;
            var price = parseFloat(itemPrice);
            var quantity = parseFloat(itemQuantity);

            var totalprice = price * quantity;
            row.insertCell(4).innerHTML = totalprice;

            updateRow();
            let totalAmount = 0;
            for (let i = 0,row; i < tableBody.rows.length; i++) {
                let cells = tableBody.rows[i].getElementsByTagName('td');
                var price = parseFloat(cells[2].textContent);
                var quantity = parseFloat(cells[3].textContent);
                let totalPrice = price * quantity;
                 totalAmount = totalAmount + totalPrice;
                }
            
                // Display the total amount
                var total = document.getElementById('total-amount');
                total.innerHTML =totalAmount.toFixed(2); // Adjust as needed for formatting

        }
    });

    document.querySelector('.pop-remove').addEventListener('click', function() {
        selectedRow = document.querySelector('.selected-row');
        if (selectedRow) {
            selectedRow.parentNode.removeChild(selectedRow);
            selectedRow.classList.remove('selected-row');
        }

        // Clear form
        inputItemName.value = '';
        inputItemId.value = '';
        inputPrice.value = '';
        inputQuantity.value = '';
        inputAmount.value = '';

        // Close the popup
        popup.style.display = 'none';
    });

    function updateRow() {
        var rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            row.addEventListener('click', function(event) {
                rows.forEach(row => {
                    row.classList.remove('selected-row');
                });
                row.classList.add('selected-row');
            });
        });
    }

    document.querySelector('.button-edit').addEventListener('click', function() {
        selectedRow = document.querySelector('.selected-row');
        if (selectedRow) {
            inputItemName.value = selectedRow.cells[0].textContent;
            inputItemId.value = selectedRow.cells[1].textContent;
            inputPrice.value = selectedRow.cells[2].textContent;
            inputQuantity.value = selectedRow.cells[3].textContent;
           // inputAmount.value = selectedRow.cells[4].textContent;

            pophead.textContent = "Edit Purchase Order";
            btnRemove.style.display = 'flex';
            btnSave.style.width = '40%';
            popup.style.display = 'flex';
            togglePopup(popup);
        }
    });

    document.querySelector('.button-Order').addEventListener('click', function() {
        // Get the values from the first table (Create Purchase Order)
        const orderTable = document.getElementById('orderTable');
        const rows = orderTable.getElementsByTagName('tbody')[0].rows;
        let orderData = [];

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let rowData = [];
            for (let j = 0; j < row.cells.length; j++) {
                rowData.push(row.cells[j].innerText);
            }
            orderData.push(rowData);
        }

        // Get additional info (User, Purchase ID, Date, Status, Manager)
        const user = document.getElementById('userInput').value;
        const purchaseId = document.getElementById('purchaseId').innerText.trim();
        const date = document.getElementById('dateID').value; // Get the date value

        const status = document.getElementById('status').value;
        const manager = document.getElementById('manager').value;
        const amount = document.getElementById('total-amount').textContent
        // Get the second table (Purchase History)
        const historyTable = document.querySelector('.scrollable-history table tbody');

        // Create a new row and add the data to the history table
        
            let newRow = historyTable.insertRow();
            newRow.insertCell(0).innerText = date; // Insert the date into the first cell
            newRow.insertCell(1).innerText = user;
            newRow.insertCell(2).innerText = purchaseId;
            newRow.insertCell(3).innerText = manager;
            newRow.insertCell(4).innerText = status;
            newRow.insertCell(5).innerText = amount; // Assuming the amount is the last cell in the row
        

            let  orderId = getOrderId();
            let orderManager = getManager();
            let orderDate = getDate();
            let orderStatus = getStatus();
            let orderComment = getComment();
            let ordertableData = getTableData();
            let orderTotalAmount = getTotalAmount();
            console.log(ordertableData);
    
            let postData = {
                customerId: orderId,
                manager:orderManager,
                date:orderDate,
                status:orderStatus,
                comment:orderComment,
                quantity: ordertableData[0][3],
                totalValue: orderTotalAmount
            } 
            console.log(postData);
           postRowData(postData);


        // Clear the table body (Create Purchase Order table)
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

        // Generate a new purchase ID
        document.getElementById('purchaseId').innerText = generateNewPurchaseId();

    });

    function getTableData() {
                            
        let table = tableBody;
        let rows = table.getElementsByTagName('tr');
        console.log(rows);
        console.log(tableBody);
        let data = [];

        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName('td');
            let rowData = [];
            console.log(cells);
                rowData.push(cells[3].innerText); //get quantity
            data.push(rowData);
        }
        return data;
    }

    function getOrderId(){
        let orderId = document.getElementById('purchaseId');
        return orderId ? orderId.innerText:'';
    }

    function getManager(){
        let manager = document.getElementById('manager');
        return manager ? manager.value:'';
    }
    function getDate(){
        let date = document.getElementById('dateID');
        console.log(date);
        return date ? date.value:'';
    }

    function getStatus(){
        let orderStatus = document.getElementById('status');
        return orderStatus ? orderStatus.innerText:'';
    }

    function getComment() {
        let comment = document.getElementById('comment');
        
        return comment ? comment.value:'';
    }

    function getTotalAmount() {
        let totalAmount = document.getElementById('total-amount');
        return totalAmount ? totalAmount.innerText:'';
    }

    function togglePopup(popup) {
        if (popup.classList.contains('show')) {
            popup.classList.remove('show');
            popup.classList.add('hide');
        } else {
            popup.classList.remove('hide');
            popup.classList.add('show');
        }
    }

    function generateNewPurchaseId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10;
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
});

// start of backend

function postRowData(rowData){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/purchaseOrders", true);
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Success:", JSON.parse(xhr.responseText));
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(rowData));
}