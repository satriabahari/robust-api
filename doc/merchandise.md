# Merchendise API Spec

## Create Merchendise

Endpoint : POST /api/merchendises

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

Endpoint: GET /api/merchendises/:merchendiseId

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

Endpoint : PUT /api/merchendises/:merchendiseId

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

Endpoint: DELETE /api/merchendises/:merchendiseId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

## List Merchendise

Endpoint : GET /api/merchendises

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
