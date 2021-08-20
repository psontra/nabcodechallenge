# NAB Assignment

**Requisites**
- node version >= 12 (tested and run on **v12.18.3**)
- npm

**Steps to run:**
- Run `npm install` or `yarn install` to install packages
- Run `npm start` or `yarn start` to start server. (*default port is **3000***)

**Details of project**
 
1. API server supports the following endpoints:
    - `/api/users`: Get list of current users - must have `user-view` permission, token will be validated when call
        - Support the following queries:
            - page: page number
            - pageSize: number of items per page
            - email: email of user to query (query type will be `contain`)
            - name: name of user to query (query type will be `contain`)
            - lastAccess: last time user login to system (query type will be equal `year, month and date`)
            - Sample query url: `http://localhost:1111/api/users?page=1&pageSize=10&email=example&name=example&lastAccess=2020-05-10`
        - Request's header:
            ```
            {
                ... Other headers,
                "uuid": "token-uuid-string"
            }
            ```
    - `/api/users/login`: Login a user - no permission check, no token needed 
        - **Note**: assume that password is already hashed when send request
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
