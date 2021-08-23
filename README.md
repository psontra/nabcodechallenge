# NAB Code Challenge

##Requisites
- node version >= 12 (tested and run on **v12.18.3**)
- npm/yarn
- docker (tested on **v20.10.8**) and docker-compose (tested on **v1.29.2**)

##Steps to run:
- Run `npm install` or `yarn install` to install packages
- Run `npm start` or `yarn start` to start server. (*default port is **3000***)

##Details of project
There are 2 applications: `API` and `Activity Service`
1. `API` server supports the following endpoints:
    - `/products`: Get list of products
        - Support the following queries:
            - name: name of product - string
            - price: price of product - number
            - color: color of product - string  
            - brandId: brand id that product belongs to - string (uuid v4)
            - categoryId: category id that product belongs to - string (uuid v4)
            - sortBy: set sort order of product list
        - How to use operators to query:     
            - Current support operators: 
                - `eq`: equal
                - `lt`: less than
                - `lte`: less than equal
                - `gt`: greater than
                - `gte`: greater than equal
                - `contain`: contain in text
            - Syntax: append `__<operator>` next to field name, Ex: name__contain=gigabyte means to query **name** field that contains `gigabyte` keyword.
        - How to use sort by query to sort list of product:
            - Syntax: `sortBy=<fieldName>:asc|desc`
        - Sample CURL command: `curl "http://localhost:3000/products/?name__contain=gigabyte&sortBy=price:asc"`
        
    - `/products/:productId`: Get a product's detail
        
        - Response:
            ```
            {
                "data": {
                    "user_id": "user-id",
                    "login_id": "example@example.com",
                    "full_name": "exampleName",
                    "latest_login": "2020-05-10T17:27:42.519Z",
                    "created_date": "2020-05-10T11:57:09.464Z",
                    "role": "role-id"
                },
                "meta": {
                    "resource": "users"
                }
            }
            ```
        - Response's header:
            ```
            {
                ... Other headers,
                "uuid": "token-uuid-string"
            }
            ```      
              
    - `/api/users/logout`: Expire a token - must have `user-logout` permission, token will be validated when call
        - Request's header:
            ```
            {
                ... Other headers,
                "uuid": "token-uuid-string"
            }
            ```
        - Response: empty string with status 200 OK or error returned in JSON
    - `/api/users/register`: Create a new user - no permission check, no token needed
        - Body data:
            ```
            {
                "email": "example@example.com", // require, check if email is valid
                "password": "samplePassword", // require
                "name": "exampleName" // require
            } 
            ```
        - Response:
            ```
            {
                "data": {
                    "user_id": "user-id",
                    "login_id": "example@example.com",
                    "full_name": "exampleName",
                    "created_date": "2020-05-10T11:57:09.464Z",
                    "role": "role-id"
                },
                "meta": {
                    "resource": "users"
                }
            }
            ```
        - Sample query url: `http://localhost:1111/api/users/<user-id>/assignRole`  
            
    - `/api/users/:_id/assignRole`: assign role to a user by role name
        - Body data:
            ```
            {
                "roleName": "Admin", // require
            } 
            ```
        - Response:
            ```
            {
                "data": {
                    "user_id": "user-id",
                    "login_id": "example@example.com",
                    "full_name": "exampleName",
                    "created_date": "2020-05-10T11:57:09.464Z",
                    "latest_login": "2020-05-10T17:27:42.519Z",
                    "role": "role-id"
                },
                "meta": {
                    "resource": "users"
                }
            }
            ```  
            
    - `/api/health`: to check if API is running or not
