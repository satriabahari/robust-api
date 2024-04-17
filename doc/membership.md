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

## Search Membership

Endpoint: GET /api/memberships

Query Params :

- title: string, title membership, optional
- description: string, description membership, optional
- price: number, price membership, optional
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
      "price": 100000
    },
    {
      "id": 2,
      "title": "Yoga",
      "description": "Yoga adalah blablabla",
      "price": 200000
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
