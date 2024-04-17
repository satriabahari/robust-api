# Training API Spec

## Create Training

Endpoint : POST /api/trainings

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

## Get Training

Endpoint: GET /api/trainings/:trainingId

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

## Update Training

Endpoint : PUT /api/trainings/:trainingId

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

## Remove Training

Endpoint: DELETE /api/trainings/:trainingId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

## List Training

Endpoint : GET /api/trainings

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
