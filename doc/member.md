# Member API Spec

## Create Member

Endpoint : POST /api/members

Headers:

- Authorization: token

Request Body:

```json
{
  "first_name": "satria",
  "last_name": "bahari",
  "date_birth": "2003-07-07",
  "phone": "082183340920",
  "membership_name": "Yoga",
  "duration": "3 month"
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "first_name": "satria",
    "last_name": "bahari",
    "date_birth": "2003-07-07",
    "phone": "082183340920",
    "membership_name": "Yoga",
    "duration": "3 month",
    "start_date": "2024-07-07",
    "end_date": "2024-10-07"
  }
}
```

## Get Member

Endpoint: GET /api/members/:memberId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": {
    "id": 1,
    "first_name": "satria",
    "last_name": "bahari",
    "date_birth": "2003-07-07",
    "phone": "082183340920",
    "membership_name": "Yoga",
    "duration": "3 month",
    "start_date": "2024-07-07",
    "end_date": "2024-10-07"
  }
}
```

## Update Member

Endpoint : PUT /api/members/:memberId

Headers:

- Authorization: token

Request Body:

```json
{
  "first_name": "satria",
  "last_name": "bahari",
  "date_birth": "2003-07-07",
  "phone": "082183340920",
  "membership_name": "Yoga",
  "duration": "3 month"
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "first_name": "satria",
    "last_name": "bahari",
    "date_birth": "2003-07-07",
    "phone": "082183340920",
    "membership_name": "Yoga",
    "duration": "3 month",
    "start_date": "2024-07-07",
    "end_date": "2024-10-07"
  }
}
```

## Remove Member

Endpoint: DELETE /api/members/:memberId

Headers:

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

## List Member

Endpoint : GET /api/members

Headers:

- Authorization: token

Response Body:

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "satria",
      "last_name": "bahari",
      "date_birth": "2003-07-07",
      "phone": "082183340920",
      "membership_name": "Yoga",
      "duration": "3 month",
      "start_date": "2024-07-07",
      "end_date": "2024-10-07"
    },
    {
      "id": 2,
      "first_name": "satria",
      "last_name": "bahari",
      "date_birth": "2003-07-07",
      "phone": "082183340920",
      "membership_name": "Yoga",
      "duration": "3 month",
      "start_date": "2024-07-07",
      "end_date": "2024-10-07"
    }
  ]
}
```

## Search Member

Endpoint : GET /api/members/

Headers:

- Authorization: token

Query Params :

- name: string, member first name or member last name, optional
- phone: string, member phone, optional
- membership name, membership name, optional
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "satria",
      "last_name": "bahari",
      "date_birth": "2003-07-07",
      "phone": "082183340920",
      "membership_name": "Yoga",
      "duration": "3 month",
      "start_date": "2024-07-07",
      "end_date": "2024-10-07"
    },
    {
      "id": 2,
      "first_name": "satria",
      "last_name": "bahari",
      "date_birth": "2003-07-07",
      "phone": "082183340920",
      "membership_name": "Yoga",
      "duration": "3 month",
      "start_date": "2024-07-07",
      "end_date": "2024-10-07"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
