# Inventory Management System Using `Springboot`, `PostgreSQL`, and `Web`.


# API Endpoints
API Endpoints of the Inventory Management System.

## MODELS
### [Admin](#admin-api)
### [Customer](#customer-api)
### [Inventory Manager](#manager-api)
### [Supplier](#supplier-api)
### [Product](#product-api)
### [Product Batch](#batch-api)
### [Purchase Order](#po-api)
### [Sales Order](#so-api)

## Admin <a id="admin-api"></a>
The `Admin` model represents an admin in the system.

- **Fields**:
    - `id` (long): The unique identifier for the admin.
    - `name` (string): The name of the admin.
    - `password` (string): The password for the admin.

```json
{
    "id": "long",
    "name": "string",
    "password": "string"
}
```

### Create a New Admin

#### Request
- **Method**: POST
- **Endpoint**: `/api/admins`
- **Description**: Creates a new admin.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Get Admin by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/admins/{id}`
- **Description**: Retrieves an admin by their ID.
- **Path Variable**:
    - `id` (required): The ID of the admin.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Get All Admins

#### Request
- **Method**: GET
- **Endpoint**: `/api/admins`
- **Description**: Retrieves a list of all admins.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "name": "string",
                "password": "string"
            },
            ...
        ]
        ```

### Update Admin

#### Request
- **Method**: PUT
- **Endpoint**: `/api/admins/{id}`
- **Description**: Updates an existing admin.
- **Path Variable**:
    - `id` (required): The ID of the admin to update.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Delete Admin

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/admins/{id}`
- **Description**: Deletes an admin by their ID.
- **Path Variable**:
    - `id` (required): The ID of the admin to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Admin successfully deleted!"
        }
        ```


## Customer <a id="customer-api"></a>
The `Customer` model represents a customer in the system.

- **Fields**:
    - `id` (long): The unique identifier for the customer.
    - `name` (string): The name of the customer.
    - `password` (string): The password for the customer.
    - `status` (short): The status of the customer.
    - `comment` (string): Additional comments about the customer.

```json
{
    "id": "long",
    "name": "string",
    "password": "string",
    "status": "short",
    "comment": "string"
}
```

### Create a New Customer

#### Request
- **Method**: POST
- **Endpoint**: `/api/customers`
- **Description**: Creates a new customer.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string",
        "status": "short",
        "comment": "string"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string",
            "status": "short",
            "comment": "string"
        }
        ```

### Get Customer by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/customers/{id}`
- **Description**: Retrieves a customer by their ID.
- **Path Variable**:
    - `id` (required): The ID of the customer.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string",
            "status": "short",
            "comment": "string"
        }
        ```

### Get All Customers

#### Request
- **Method**: GET
- **Endpoint**: `/api/customers`
- **Description**: Retrieves a list of all customers.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "name": "string",
                "password": "string",
                "status": "short",
                "comment": "string"
            },
            ...
        ]
        ```

### Update Customer

#### Request
- **Method**: PUT
- **Endpoint**: `/api/customers/{id}`
- **Description**: Updates an existing customer.
- **Path Variable**:
    - `id` (required): The ID of the customer to update.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string",
        "status": "short",
        "comment": "string"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string",
            "status": "short",
            "comment": "string"
        }
        ```

### Delete Customer

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/customers/{id}`
- **Description**: Deletes a customer by their ID.
- **Path Variable**:
    - `id` (required): The ID of the customer to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Customer successfully deleted!"
        }
        ```


## Inventory Manager <a id="manager-api"></a>
The `InventoryManager` model represents an inventory manager in the system.

- **Fields**:
    - `id` (long): The unique identifier for the inventory manager.
    - `name` (string): The name of the inventory manager.
    - `password` (string): The password for the inventory manager.

```json
{
    "id": "long",
    "name": "string",
    "password": "string"
}
```

### Create a New Inventory Manager

#### Request
- **Method**: POST
- **Endpoint**: `/api/inventoryManagers`
- **Description**: Creates a new inventory manager.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Get Inventory Manager by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/inventoryManagers/{id}`
- **Description**: Retrieves an inventory manager by their ID.
- **Path Variable**:
    - `id` (required): The ID of the inventory manager.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Get All Inventory Managers

#### Request
- **Method**: GET
- **Endpoint**: `/api/inventoryManagers`
- **Description**: Retrieves a list of all inventory managers.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "name": "string",
                "password": "string"
            },
            ...
        ]
        ```

### Update Inventory Manager

#### Request
- **Method**: PUT
- **Endpoint**: `/api/inventoryManagers/{id}`
- **Description**: Updates an existing inventory manager.
- **Path Variable**:
    - `id` (required): The ID of the inventory manager to update.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Delete Inventory Manager

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/inventoryManagers/{id}`
- **Description**: Deletes an inventory manager by their ID.
- **Path Variable**:
    - `id` (required): The ID of the inventory manager to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "InventoryManager successfully deleted!"
        }
        ```



## Supplier <a id="supplier-api"></a>
The `Supplier` model represents an supplier in the system.

- **Fields**:
    - `id` (long): The unique identifier for the supplier.
    - `name` (string): The name of the supplier.
    - `password` (string): The password for the supplier.

```json
{
    "id": "long",
    "name": "string",
    "password": "string"
}
```

### Create a New Supplier

#### Request
- **Method**: POST
- **Endpoint**: `/api/suppliers`
- **Description**: Creates a new supplier.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Get Supplier by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/suppliers/{id}`
- **Description**: Retrieves a supplier by their ID.
- **Path Variable**:
    - `id` (required): The ID of the supplier.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Get All Suppliers

#### Request
- **Method**: GET
- **Endpoint**: `/api/suppliers`
- **Description**: Retrieves a list of all suppliers.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "name": "string",
                "password": "string"
            },
            ...
        ]
        ```

### Update Supplier

#### Request
- **Method**: PUT
- **Endpoint**: `/api/suppliers/{id}`
- **Description**: Updates an existing supplier.
- **Path Variable**:
    - `id` (required): The ID of the supplier to update.
- **Request Body**:
    ```json
    {
        "name": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "name": "string",
            "password": "string"
        }
        ```

### Delete Supplier

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/suppliers/{id}`
- **Description**: Deletes a suppplier by their ID.
- **Path Variable**:
    - `id` (required): The ID of the supplier to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Supplier successfully deleted!"
        }
        ```

        
## Product <a id="product-api"></a>
The `Product` model represents a product in the system.

- **Fields**:
    - `id` (long): The unique identifier for the product.
    - `supplier` (Supplier): The supplier associated with this product.
    - `name` (string): The name of the product.
    - `price` (double): The price of the product.
    - `quantity` (int): The quantity of the product in stock.

```json
{
    "id": "long",
    "supplier": {
        "id": "long"
    },
    "name": "string",
    "price": "double",
    "quantity": "int"
}
```

### Create a New Product

#### Request
- **Method**: POST
- **Endpoint**: `/api/products`
- **Description**: Creates a new product.
- **Request Body**:
    ```json
    {
        "supplier": {
            "id": "long"
        },
        "name": "string",
        "price": "double",
        "quantity": "int"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "supplier": {
                "id": "long"
            },
            "name": "string",
            "price": "double",
            "quantity": "int"
        }
        ```

### Get Product by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/products/{id}`
- **Description**: Retrieves a product by its ID.
- **Path Variable**:
    - `id` (required): The ID of the product.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "supplier": {
                "id": "long"
            },
            "name": "string",
            "price": "double",
            "quantity": "int"
        }
        ```

### Get All Products

#### Request
- **Method**: GET
- **Endpoint**: `/api/products`
- **Description**: Retrieves a list of all products.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "supplier": {
                    "id": "long"
                },
                "name": "string",
                "price": "double",
                "quantity": "int"
            },
            ...
        ]
        ```

### Update Product

#### Request
- **Method**: PUT
- **Endpoint**: `/api/products/{id}`
- **Description**: Updates an existing product.
- **Path Variable**:
    - `id` (required): The ID of the product to update.
- **Request Body**:
    ```json
    {
        "supplier": {
            "id": "long"
        },
        "name": "string",
        "price": "double",
        "quantity": "int"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "supplier": {
                "id": "long"
            },
            "name": "string",
            "price": "double",
            "quantity": "int"
        }
        ```

### Delete Product

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/products/{id}`
- **Description**: Deletes a product by its ID.
- **Path Variable**:
    - `id` (required): The ID of the product to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Product successfully deleted!"
        }
        ```
        

## Product Batch <a id="batch-api"></a>
The `ProductBatch` model represents a product batch in the system.

- **Fields**:
    - `id` (long): The unique identifier for the product batch.
    - `product` (Product): The product associated with this batch.
    - `expiration` (date): The expiration date of the batch.
    - `quantity` (int): The quantity of products in the batch.

```json
{
    "id": "long",
    "product": {
        "id": "long"
    },
    "expiration": "date",
    "quantity": "int"
}
```

### Create a New Product Batch

#### Request
- **Method**: POST
- **Endpoint**: `/api/productBatches`
- **Description**: Creates a new product batch.
- **Request Body**:
    ```json
    {
        "product": {
            "id": "long"
        },
        "expiration": "date",
        "quantity": "int"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "product": {
                "id": "long"
            },
            "expiration": "date",
            "quantity": "int"
        }
        ```

### Get Product Batch by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/productBatches/{id}`
- **Description**: Retrieves a product batch by its ID.
- **Path Variable**:
    - `id` (required): The ID of the product batch.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "product": {
                "id": "long"
            },
            "expiration": "date",
            "quantity": "int"
        }
        ```

### Get All Product Batches

#### Request
- **Method**: GET
- **Endpoint**: `/api/productBatches`
- **Description**: Retrieves a list of all product batches.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "product": {
                    "id": "long"
                },
                "expiration": "date",
                "quantity": "int"
            },
            ...
        ]
        ```

### Update Product Batch

#### Request
- **Method**: PUT
- **Endpoint**: `/api/productBatches/{id}`
- **Description**: Updates an existing product batch.
- **Path Variable**:
    - `id` (required): The ID of the product batch to update.
- **Request Body**:
    ```json
    {
        "product": {
            "id": "long"
        },
        "expiration": "date",
        "quantity": "int"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "product": {
                "id": "long"
            },
            "expiration": "date",
            "quantity": "int"
        }
        ```

### Delete Product Batch

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/productBatches/{id}`
- **Description**: Deletes a product batch by its ID.
- **Path Variable**:
    - `id` (required): The ID of the product batch to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "ProductBatch successfully deleted!"
        }
        ```


## Purchase Order <a id="po-api"></a>
The `PurchaseOrder` model represents a purchase order in the system.

- **Fields**:
    - `id` (long): The unique identifier for the purchase order.
    - `customer` (Customer): The customer associated with this purchase order.
    - `manager` (InventoryManager): The inventory manager associated with this purchase order.
    - `product` (Product): The product associated with this purchase order.
    - `quantity` (int): The quantity of products in the order.
    - `date` (Date): The date of the order.
    - `totalValue` (double): The total value of the order.
    - `status` (short): The status of the order.
    - `comment` (string): Any additional comments related to the order.

```json
{
    "id": "long",
    "customer": {
        "id": "long"
    },
    "manager": {
        "id": "long"
    },
    "product": {
        "id": "long"
    },
    "quantity": "int",
    "date": "date",
    "totalValue": "double",
    "status": "short",
    "comment": "string"
}
```

### Create a New Purchase Order

#### Request
- **Method**: POST
- **Endpoint**: `/api/purchaseOrders`
- **Description**: Creates a new purchase order.
- **Request Body**:
    ```json
    {
        "customer": {
            "id": "long"
        },
        "manager": {
            "id": "long"
        },
        "product": {
            "id": "long"
        },
        "quantity": "int",
        "date": "date",
        "totalValue": "double",
        "status": "short",
        "comment": "string"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "customer": {
                "id": "long"
            },
            "manager": {
                "id": "long"
            },
            "product": {
                "id": "long"
            },
            "quantity": "int",
            "date": "date",
            "totalValue": "double",
            "status": "short",
            "comment": "string"
        }
        ```

### Get Purchase Order by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/purchaseOrders/{id}`
- **Description**: Retrieves a purchase order by its ID.
- **Path Variable**:
    - `id` (required): The ID of the purchase order.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "customer": {
                "id": "long"
            },
            "manager": {
                "id": "long"
            },
            "product": {
                "id": "long"
            },
            "quantity": "int",
            "date": "date",
            "totalValue": "double",
            "status": "short",
            "comment": "string"
        }
        ```

### Get All Purchase Orders

#### Request
- **Method**: GET
- **Endpoint**: `/api/purchaseOrders`
- **Description**: Retrieves a list of all purchase orders.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "customer": {
                    "id": "long"
                },
                "manager": {
                    "id": "long"
                },
                "product": {
                    "id": "long"
                },
                "quantity": "int",
                "date": "date",
                "totalValue": "double",
                "status": "short",
                "comment": "string"
            },
            ...
        ]
        ```

### Update Purchase Order

#### Request
- **Method**: PUT
- **Endpoint**: `/api/purchaseOrders/{id}`
- **Description**: Updates an existing purchase order.
- **Path Variable**:
    - `id` (required): The ID of the purchase order to update.
- **Request Body**:
    ```json
    {
        "customer": {
            "id": "long"
        },
        "manager": {
            "id": "long"
        },
        "product": {
            "id": "long"
        },
        "quantity": "int",
        "date": "date",
        "totalValue": "double",
        "status": "short",
        "comment": "string"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "customer": {
                "id": "long"
            },
            "manager": {
                "id": "long"
            },
            "product": {
                "id": "long"
            },
            "quantity": "int",
            "date": "date",
            "totalValue": "double",
            "status": "short",
            "comment": "string"
        }
        ```

### Delete Purchase Order

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/purchaseOrders/{id}`
- **Description**: Deletes a purchase order by its ID.
- **Path Variable**:
    - `id` (required): The ID of the purchase order to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Purchase Order successfully deleted!"
        }
        ```
        

## Sales Order <a id="so-api"></a>
The `SalesOrder` model represents a sales order in the system.

- **Fields**:
    - `id` (long): The unique identifier for the sales order.
    - `customer` (Customer): The customer associated with this sales order.
    - `manager` (InventoryManager): The inventory manager associated with this sales order.
    - `product` (Product): The product associated with this sales order.
    - `productBatch` (ProductBatch): The product batch associated with this sales order.
    - `quantity` (int): The quantity of products in the order.
    - `date` (date): The date of the order.
    - `totalValue` (double): The total value of the order.
    - `status` (short): The status of the order.
    - `comment` (string): Any additional comments related to the order.

```json
{
    "id": "long",
    "customer": {
        "id": "long"
    },
    "manager": {
        "id": "long"
    },
    "product": {
        "id": "long"
    },
    "productBatch": {
        "id": "long"
    },
    "quantity": "int",
    "date": "date",
    "totalValue": "double",
    "status": "short",
    "comment": "string"
}
```

### Create a New Sales Order

#### Request
- **Method**: POST
- **Endpoint**: `/api/salesOrders`
- **Description**: Creates a new sales order.
- **Request Body**:
    ```json
    {
        "customer": {
            "id": "long"
        },
        "manager": {
            "id": "long"
        },
        "product": {
            "id": "long"
        },
        "productBatch": {
            "id": "long"
        },
        "quantity": "int",
        "date": "date",
        "totalValue": "double",
        "status": "short",
        "comment": "string"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "id": "long",
            "customer": {
                "id": "long"
            },
            "manager": {
                "id": "long"
            },
            "product": {
                "id": "long"
            },
            "productBatch": {
                "id": "long"
            },
            "quantity": "int",
            "date": "date",
            "totalValue": "double",
            "status": "short",
            "comment": "string"
        }
        ```

### Get Sales Order by ID

#### Request
- **Method**: GET
- **Endpoint**: `/api/salesOrders/{id}`
- **Description**: Retrieves a sales order by its ID.
- **Path Variable**:
    - `id` (required): The ID of the sales order.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "customer": {
                "id": "long"
            },
            "manager": {
                "id": "long"
            },
            "product": {
                "id": "long"
            },
            "productBatch": {
                "id": "long"
            },
            "quantity": "int",
            "date": "date",
            "totalValue": "double",
            "status": "short",
            "comment": "string"
        }
        ```

### Get All Sales Orders

#### Request
- **Method**: GET
- **Endpoint**: `/api/salesOrders`
- **Description**: Retrieves a list of all sales orders.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "id": "long",
                "customer": {
                    "id": "long"
                },
                "manager": {
                    "id": "long"
                },
                "product": {
                    "id": "long"
                },
                "productBatch": {
                    "id": "long"
                },
                "quantity": "int",
                "date": "date",
                "totalValue": "double",
                "status": "short",
                "comment": "string"
            },
            ...
        ]
        ```

### Update Sales Order

#### Request
- **Method**: PUT
- **Endpoint**: `/api/salesOrders/{id}`
- **Description**: Updates an existing sales order.
- **Path Variable**:
    - `id` (required): The ID of the sales order to update.
- **Request Body**:
    ```json
    {
        "customer": {
            "id": "long"
        },
        "manager": {
            "id": "long"
        },
        "product": {
            "id": "long"
        },
        "productBatch": {
            "id": "long"
        },
        "quantity": "int",
        "date": "date",
        "totalValue": "double",
        "status": "short",
        "comment": "string"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "id": "long",
            "customer": {
                "id": "long"
            },
            "manager": {
                "id": "long"
            },
            "product": {
                "id": "long"
            },
            "productBatch": {
                "id": "long"
            },
            "quantity": "int",
            "date": "date",
            "totalValue": "double",
            "status": "short",
            "comment": "string"
        }
        ```

### Delete Sales Order

#### Request
- **Method**: DELETE
- **Endpoint**: `/api/salesOrders/{id}`
- **Description**: Deletes a sales order by its ID.
- **Path Variable**:
    - `id` (required): The ID of the sales order to delete.
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Sales Order successfully deleted!"
        }
        ```
