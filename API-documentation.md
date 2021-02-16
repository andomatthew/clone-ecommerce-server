# E-COMMERCE CMS


## URL :
- /users/login

## Method:
- POST

## URL Params
- None

## Header
- None

## Data Params
- email
- password

## Success Response:
- Code: 200
- Content:
  ```json
  {
    "id": 1,
    "email": "admin@mail.com",
    "role": "admin",
    "access_token": "asdyutw1236asdsauqwkwq"
  }
  ```
## Error Response:
- Code: 401
- Content:
  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```
---
## URL :
- /products

## Method:
- GET

## URL Params
- None

## Header
- Required:

  access_token

## Data Params
- None

## Success Response:
- Code: 200
- Content:
  ```json
  [
    {
      "id": 1,
      "name": "Raket Tenis A",
      "image_url": "https://ecs7.tokopedia.net/img/cache/500-square/product-1/2020/3/24/8159/8159_9cb95dfb-bc68-41fa-ae3e-ad9a07497269_600_600.jpg",
      "price": 10000,
      "stocks": 10
    },
    {
      "id": 2,
      "name": "Raket Tenis B",
      "image_url": "https://static.tokopedia.net/blog/wp-content/uploads/2018/12/1.-Raket-Tenis-Head-Speed-300x300.jpg",
      "price": 20000,
      "stocks": 5
    },
  ]
  ```
## Error Response:
- Code: 500
- Content:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
---
## URL :
- /products

## Method:
- POST

## URL Params
- None

## Header
- Required:
  
  access_token

## Data Params
- name
- image_url
- price
- stocks

## Success Response:
- Code: 201
- Content:
  ```json
  {
    "id": 3,
    "name": "Raket Tenis C",
    "image_url": "https://sc04.alicdn.com/kf/HTB12C33isuYBuNkSmRyq6AA3pXal.jpg",
    "price": 15000,
    "stocks": 7
  }
  ```
## Error Response:
- Code: 400
- Content:
  ```json
  {
    "message": "Validation Error"
  }
  ```
---
## URL :
- /products

## Method:
- DELETE

## URL Params
- None

## Header
- Required:
  
  access_token

## Data Params
- None

## Success Response:
- Code: 200
- Content:
  ```json
  {
    "messages": "Sucessfully delete item"
  }
  ```
## Error Response:
- Code: 401
- Content:
  ```json
  {
    "message": "Not Authorized"
  }
  ```
---
## URL :
- /products

## Method:
- PUT

## URL Params
- None

## Header
- Required:
  
  access_token

## Data Params
- name
- image_url
- price
- stocks

## Success Response:
- Code: 200
- Content:
  ```json
  {
    "id": 3,
    "name": "Raket Tenis C",
    "image_url": "https://sc04.alicdn.com/kf/HTB12C33isuYBuNkSmRyq6AA3pXal.jpg",
    "price": 15000,
    "stocks": 10
  }
  ```
## Error Response:
- Code: 401
- Content:
  ```json
  {
    "message": "Not Authorized"
  }
  ```
---
## URL :
- /products

## Method:
- PATCH

## URL Params
- None

## Header
- Required:
  
  access_token

## Data Params

- price
- stocks

## Success Response:
- Code: 200
- Content:
  ```json
  {
    "id": 3,
    "name": "Raket Tenis C",
    "image_url": "https://sc04.alicdn.com/kf/HTB12C33isuYBuNkSmRyq6AA3pXal.jpg",
    "price": 15000,
    "stocks": 7
  }
  ```
## Error Response:
- Code: 401
- Content:
  ```json
  {
    "message": "Not Authorized"
  }
  ```