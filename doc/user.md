# User API Spec

## Register User

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "satria",
  "email": "satria@gmail.com",
  "password": "satria123"
}
```

Response Body (Success):

```json
{
  "username": "satria",
  "email": "satria@gmail.com"
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint: POST /api/users/login

Request Body :

```json
{
  "email": "satria@gmail.com",
  "password": "satria123"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "satria",
    "email": "satria@gmail.com",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Email or Password is wrong"
}
```

## Get User

Endpoint: GET /api/users/current

Headers

- Authorization: token

Response Body (Success):

```json
{
  "data": {
    "username": "satria",
    "email": "satria@gmail.com"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint: PATCH /api/users/current

Headers

- Authorization: token

Request Body :

```json
{
  "email": "satria@gmail.com", //optional
  "password": "satria123" //optional,
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "satria",
    "email": "satria@gmail.com"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Delete User

Endpoint: DELETE /api/users/current

Headers:

- Authorization: token

Response Body (Success):

```json
{
  "data": true
}
```
