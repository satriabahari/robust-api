# Class API Spec

## Create Class

Endpoint : POST /api/classes

Headers:

- Authorization: token

Request Body:

```json
{
  "title": "Yoga",
  "description": "Yoga adalah blablabla",
  "image": "/images/yoga.jpg"
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "Yoga",
    "description": "Yoga adalah blablabla",
    "image": "/images/yoga.jpg"
  }
}
```

## Get Class

Endpoint: GET /api/classes/:classId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "Yoga",
    "description": "Yoga adalah blablabla",
    "image": "/images/yoga.jpg"
  }
}
```

## Update Class

Endpoint : PUT /api/classes/:classId

Headers:

- Authorization: token

Request Body:

```json
{
  "title": "Yoga",
  "description": "Yoga adalah blablabla",
  "image": "/images/yoga.jpg"
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "title": "Yoga",
    "description": "Yoga adalah blablabla",
    "image": "/images/yoga.jpg"
  }
}
```

## Remove Class

Endpoint: DELETE /api/classes/:classId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

## List Class

Endpoint : GET /api/classes

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
      "image": "/images/yoga.jpg"
    },
    {
      "id": 2,
      "title": "Yoga",
      "description": "Yoga adalah blablabla",
      "image": "/images/yoga.jpg"
    }
  ]
}
```
