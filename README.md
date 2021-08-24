# NAB Code Challenge

## Requisites
- docker (tested on **v20.10.8**) and docker-compose (tested on **v1.29.2**)

### Optional
- node version >= 12 (tested and run on **v12.18.3**)
- npm/yarn

## Steps to run:
- Make sure you are at the same directory as `docker-compose.yaml`
- Run `docker-compose up`

## Details of project

### High-level design and infrastructure
![](./readme/infrastructure.png)

### Swagger document endpoint
```
http://localhost:3000/api-docs
```

### CURL commands examples to test endpoints:
- Get list of products
  ```
  curl "http://localhost:3000/products/?name__contain=gigabyte&sortBy=price:asc"
  ```
- Get product detail
  ```
  curl "http://localhost:3000/products/edcf6c53-728f-4fa9-ab52-669a30cda0fb"
  ```
- Update product
  ```
  curl -d '{"name": "updated product"}' -H 'Content-Type: application/json' -X PUT "http://localhost:3000/products/edcf6c53-728f-4fa9-ab52-669a30cda0fb"
  ```
- Delete product
  ```
  curl -X DELETE "http://localhost:3000/products/edcf6c53-728f-4fa9-ab52-669a30cda0fb"
  ```
- Create product
  ```
  curl -d '{"name": "new product", "price": "12345", "brandId": "249176ea-24d8-40e5-a729-fab46430986c", "categoryId": "aa4ef1f7-7956-43cd-9b28-cf921e249c51"}' -H 'Content-Type: application/json' "http://localhost:3000/products"
  ```

### Advance search when get list of products:
- Endpoint `/products`: 
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
        - Sample CURL command: 
          ```
          curl "http://localhost:3000/products/?name__contain=gigabyte&sortBy=price:asc"
          ```
  - **Note**: if no operator is provided, the default operator `eq` is used.
