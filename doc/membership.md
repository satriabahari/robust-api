# Membership API Spec

## Create Membership

Endpoint : POST /api/memberships

Headers:

- Authorization: token

Request Body:

```json
{
  "title": "Yoga",
  "description": "Yoga adalah blablabla",
  "price": 100000
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "Yoga",
    "description": "Yoga adalah blablabla",
    "price": 100000
  }
}
```

## Get Membership

Endpoint: GET /api/memberships/:membershipId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "Yoga",
    "description": "Yoga adalah blablabla",
    "price": 100000
  }
}
```

## Update Membership

Endpoint : PUT /api/memberships/:membershipId

Headers:

- Authorization: token

Request Body:

```json
{
  "title": "Yoga",
  "description": "Yoga adalah blablabla",
  "price": 100000
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "Yoga",
    "description": "Yoga adalah blablabla",
    "price": 100000
  }
}
```

## Remove Membership

Endpoint: DELETE /api/memberships/:membershipId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

## List Membership

Endpoint : GET /api/memberships

Headers:

- Authorization: token

Response Body:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Yoga",
      "description": "Yoga adalah blablabla",
      "price": 100000
    },
    {
      "id": 2,
      "title": "Yoga",
      "description": "Yoga adalah blablabla",
      "price": 200000
    }
  ]
}
```
