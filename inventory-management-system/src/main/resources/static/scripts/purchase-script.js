
                        var tableBody = document.querySelector('tbody');
                        var rows = tableBody.querySelectorAll('tr');
                        var popup = document.querySelector('.popup');
                        var pophead = document.querySelector('.pop-head h1');
                        var inputItemName = document.getElementById('itemname');
                        var inputItemId = document.getElementById('itemid');
                        var inputPrice = document.getElementById('price');
                        var inputQuantity = document.getElementById('quantity');
                        var inputAmount = document.getElementById('amount');

                        var btnremove = document.querySelector('.pop-remove');
                        var btnsave = document.querySelector('.pop-save');

                        updateRow(function() {
                            document.querySelector('.button-edit').style.display= 'flex';
                          });

                    document.querySelector('.pop-exit .close').addEventListener('click', function() {
                        popupExit = document.querySelector('.pop-exit .close');
                        popup.style.display = "none"
                    });

                    document.querySelector('.button-Icon').addEventListener('click', function() {
                        // Clear the form
                        inputItemName.value = '';
                        inputItemId.value = '';
                        inputPrice.value = '';
                        inputQuantity.value = '';
                        
                        pophead.textContent="Add Item";
                        btnremove.style.display = 'none';
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

                        // Add click event listener to the 'Save' button
                        document.querySelector('.pop-save').addEventListener('click', function() {

                        // Get form values
                        const itemName = inputItemName.value;
                        const itemId = inputItemId.value;
                        const itemPrice = inputPrice.value;
                        const itemQuantity = inputQuantity.value;
                        
                        // Clear the form
                        inputItemName.value = '';
                        inputItemId.value = '';
                        inputPrice.value = '';
                        inputQuantity.value = '';
                        

                        // Close the popup
                        document.querySelector('.popup').style.display = 'none';
                        if(pophead.textContent === "Edit Purchase Order"){
                            icon = selectedrow.querySelector('.material-symbols-outlined');
                            selectedrow.cells[0].textContent = itemName;
                            selectedrow.cells[1].textContent = itemId;
                            selectedrow.cells[2].textContent = itemPrice;
                            selectedrow.cells[3].textContent = itemQuantity;
                            
                            

                        } 
                        else{
                        const row = tableBody.insertRow(-1);
                        const cell1 = row.insertCell(0);
                        const cell2 = row.insertCell(1);
                        const cell3 = row.insertCell(2);
                        const cell4 = row.insertCell(3);
                        const cell5 = row.insertCell(4);

                        cell1.innerHTML = itemName;
                        cell2.innerHTML = itemId;
                        cell3.innerHTML = itemPrice;
                        cell4.innerHTML = itemQuantity;

                        
                        var price = row.cells[2].textContent;
                        var quantity = row.cells[3].textContent;
                        var priceReg = price.replace(/[^0-9\-+\.]/g, "");
                        var quantityReg = quantity.replace(/[^0-9\-+\.]/g, "");
                        var priceFinal = parseFloat(priceReg);
                        var quantityFinal = parseFloat(quantityReg);


                        let totalPrice = priceFinal * quantityFinal;

                        cell5.innerHTML = totalPrice;
                    
                        //update total amount shown
                         updateTotalAmount();
                        
                        updateRow(function() {
                            document.querySelector('.button-edit').style.display = 'flex';
                          });

                        }
                    });

                    function updateTotalAmount() {
                        var totalAmount = 0;
                        var totalPrice=0

                        // Iterate through each row in the table body
                        for (let i = 0,row; i < tableBody.rows.length; i++) {
                        var price = parseFloat(row.cells[2].textContent);
                        var quantity = parseFloat(row.cells[3].textContent);
                        

                        totalPrice = price * quantity;
                        totalAmount = totalAmount + totalPrice;
                        }
                    
                        // Display the total amount
                        var total = document.getElementById('total-amount');
                        total.innerHTML = "PHP " + totalAmount.toFixed(2); // Adjust as needed for formatting
                    }

                        // removing the whole selected row in the table
                        document.querySelector('.pop-remove').addEventListener('click', function() {
                        selectedrow = document.querySelector('.selected-row');
                        if (selectedrow) {
                            selectedrow.parentNode.removeChild(selectedrow);
                        }
                        selectedrow.classList.remove('selected-row');

                        //clear form
                        inputItemName.value = '';
                        inputItemId.value = '';
                        inputPrice.value = '';
                        inputQuantity.value = '';
                        inputAmount.value = '';

                        // Close the popup
                        document.querySelector('.popup').style.display = 'none';

                        });

                        function updateRow(callback) {
                            // Add click event listener to each row
                            rows.forEach(row => {
                                row.addEventListener('click', function(event) {
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


                        // Add click event listener to the 'Edit' button
                        document.querySelector('.button-edit').addEventListener('click', function() {
                        selectedrow = document.querySelector('.selected-row');
                        inputItemName.value = selectedrow.cells[0].textContent;
                        inputItemId.value = selectedrow.cells[1].textContent;
                        inputPrice.value = selectedrow.cells[2].textContent;
                        inputQuantity.value = selectedrow.cells[3].textContent;
                        

                        pophead.textContent="Edit Purchase Order";
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
                            const totalPrice = document.getElementById('total-amount').value;
                    
                            // Get the second table (Purchase History)
                            const historyTable = document.querySelector('.scrollable-history table tbody');
                    
                            // Create a new row and add the data to the history table
                            orderData.forEach(order => {
                                let newRow = historyTable.insertRow();
                                newRow.insertCell(0).innerText = date; // Insert the date into the first cell
                                newRow.insertCell(1).innerText = user;
                                newRow.insertCell(2).innerText = purchaseId;
                                newRow.insertCell(3).innerText = manager;
                                newRow.insertCell(4).innerText = status;
                                newRow.insertCell(5).innerText = totalPrice; // Assuming the amount is the last cell in the row
                            });
                        });
                    
                        function togglePopup(popup) {
                            if (popup.classList.contains('show')) {
                                popup.classList.remove('show');
                                popup.classList.add('hide');
                            } else {
                                popup.classList.remove('hide');
                                popup.classList.add('show');
                            }
                        }
                    
            
                    

                       
                            
                        



