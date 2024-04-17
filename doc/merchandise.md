# Merchandise API Spec

## Create Merchendise

Endpoint : POST /api/merchandise

Headers:

- Authorization: token

Request Body:

```json
{
  "title": "T-shirt Gym",
  "description": "T-shirt Gym adalah blablabla",
  "price": 100000,
  "stock": 10
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "T-shirt Gym",
    "description": "T-shirt Gym adalah blablabla",
    "price": 100000,
    "stock": 10
  }
}
```

## Get Merchendise

Endpoint: GET /api/merchandise/:merchandiseId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "T-shirt Gym",
    "description": "T-shirt Gym adalah blablabla",
    "price": 100000,
    "stock": 10
  }
}
```

## Update Merchendise

Endpoint : PUT /api/merchandise/:merchandiseId

Headers:

- Authorization: token

Request Body:

```json
{
  "title": "T-shirt Gym",
  "description": "T-shirt Gym adalah blablabla",
  "price": 100000,
  "stock": 10
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "T-shirt Gym",
    "description": "T-shirt Gym adalah blablabla",
    "price": 100000,
    "stock": 10
  }
}
```

## Remove Merchendise

Endpoint: DELETE /api/merchandise/:merchandiseId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

## List Merchendise

Endpoint : GET /api/merchandise

Headers:

- Authorization: token

Response Body:

```json
{
  "data": [
    {
      "id": 1,
      "title": "T-shirt Gym",
      "description": "T-shirt Gym adalah blablabla",
      "price": 100000,
      "stock": 10
    },
    {
      "id": 2,
      "title": "T-shirt Gym",
      "description": "T-shirt Gym adalah blablabla",
      "price": 200000,
      "stock": 10
    }
  ]
}
```

## Search Merhcandise

Endpoint: GET /api/merchandises

Query Params :

- title: string, title merchandise, optional
- description: string, description merchandise, optional
- price: number, price merchandise, optional
- stock: number, stock merchandise, optional
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "title": "Yoga",
      "description": "Yoga adalah blablabla",
      "price": 100000,
      "stock": 1
    },
    {
      "id": 2,
      "title": "Yoga",
      "description": "Yoga adalah blablabla",
      "price": 200000,
      "stock": 1
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
