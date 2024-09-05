# Library-app-service

## Description

This is for a library to provide their books and to create order to borrow book(s)

## Tech stack

* NestJS
  
## How to use

#### Prerequisite

  -   Node 20.2.0 / NPM 9.6.6
  -   Install dependencies using `npm ci`

### Run Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run Application on prod server
1. Clone the repository from github
2. Install dependencies using `npm ci`
3. Build application using `npm run build`
4. Run application using `node dist/src/main.js`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints
* [ GET /books/subjects/:subject ](#get-books-subjects-subject)
* [ GET /books/subjects ](#get-books-subjects)
* [ POST /orders ](#post-orders)
* [ GET /orders ](#get-orders)
<br/>

### GET /books/subjects/:subject

This endpoint used to get books by subject

#### Param
| Field | Type | Required (Y/N) | Description |
| ----- | ---- | -------------- | ----------- |
| subject | string | Y | Subject to be searched|

#### Query Params

| Field | Type | Required (Y/N) | Description |
| ----- | ---- | -------------- | ----------- |
| limit | number | N | Number of data to be returned |
| offset | number | N | Number of start data |

Example

```
{
    "limit": 5,
    "offset": 2
}
```

#### Response Body

##### 200 OK

Array of books that contains
| Field | Type | Description |
| ----- | ---- | -------------- |
| key | string | key of book |
| title | string | title of book |
| authors | array of string | list of authors |
| edition_number | number | book's edition number |

##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

<br />

### GET /books/subjects/

This endpoint used to get subjects available

#### Response Body

##### 200 OK

Array of string of subjects


##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

<br />

### POST /orders

This endpoint used to create a new order

#### Body

| Field | Type | Required (Y/N) | Description |
| ----- | ---- | -------------- | ----------- |
| book_key | string | Y | key of book, can be obtained on get books api |
| customer_name | string | Y | customer's name |
| customer_phone_number | string | Y | customer's phone number |
| start_borrow_date | string | Y | date to start to borrow the books, should be in ISO8601 format (e.g 2024-09-30) |
| end_borrow_date | string | Y | date to end to borrow the books, should be in ISO8601 format (e.g 2024-09-30) |

Example

```
{
    "book_key": "/works/OL86318W",
    "customer_name": "Test",
    "customer_phone_number": "+628571260813",
    "start_borrow_date": "2024-09-04",
    "end_borrow_date": "2024-09-05"
}
```

#### Response Body

##### 201 CREATED

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | number | id of order |
| book_key | string | key of book, can be obtained on get books api |
| customer_name | string | customer's name |
| customer_phone_number | string | customer's phone number |
| start_borrow_date | string | date to start to borrow the books, should be in ISO8601 format (e.g 2024-09-30) |
| end_borrow_date | string | date to end to borrow the books, should be in ISO8601 format (e.g 2024-09-30) |

##### 400 BAD REQUEST

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |

<br />

### GET /orders

This endpoint used to get all orders


#### Query Params

| Field | Type | Required (Y/N) | Description |
| ----- | ---- | -------------- | ----------- |
| limit | number | N | Number of data to be returned |
| offset | number | N | Number of start data |

Example

```
{
    "limit": 5,
    "offset": 2
}
```

#### Response Body

##### 200 OK

| Field | Type | Description |
| ----- | ---- | -------------- |
| data | string | list of orders |
| count | string | number of data |
| limit | array of string | Number of data returned |
| offset | number | N | Number of start data |

Orders consist of
| Field | Type | Description |
| ----- | ---- | -------------- |
| id | number | id of order |
| book_key | string | key of book, can be obtained on get books api |
| customer_name | string | customer's name |
| customer_phone_number | string | customer's phone number |
| start_borrow_date | string | date to start to borrow the books, should be in ISO8601 format (e.g 2024-09-30) |
| end_borrow_date | string | date to end to borrow the books, should be in ISO8601 format (e.g 2024-09-30) |
| book | object of book | consist of title and authors|


##### 500 INTERNAL SERVER ERROR

| Field | Type | Description |
| ----- | ---- | -------------- |
| message | string | message of the operation |
