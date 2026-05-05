# API Reference

Base URL: `/api`

Endpoints marked with **Auth** require an `Authorization: <token>` header.

---

## Users

### POST `/api/users/register`
Create a new account.

**Body**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "dateOfBirth": "ISO 8601 date string",
  "nationality": "string"
}
```

**Responses**
| Status | Description |
|--------|-------------|
| 201 | Account created |
| 400 | Missing required fields |
| 400 | Email already in use |

---

### POST `/api/users/login`
Log in and receive a JWT.

**Body**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response `200`**
```json
{
  "message": "Successfully logged in",
  "token": "string",
  "user": {
    "id": 1,
    "name": "string",
    "email": "string",
    "dob": "string",
    "points": 0,
    "nationality": "string",
    "title": "string"
  }
}
```

| Status | Description |
|--------|-------------|
| 200 | Login successful |
| 401 | Invalid email or password |

---

### POST `/api/users/me` — Auth
Fetch the currently authenticated user's profile.

**Response `200`**
```json
{
  "user": {
    "id": 1,
    "name": "string",
    "email": "string",
    "dob": "string",
    "points": 0,
    "nationality": "string",
    "title": "string"
  }
}
```

| Status | Description |
|--------|-------------|
| 200 | User returned |
| 401 | No valid token |

---

### PATCH `/api/users/update/:id`
Update a user's profile.

**Params**
- `id` — user ID

**Body**
```json
{
  "email": "string",
  "name": "string",
  "nationality": "string",
  "dob": "ISO 8601 date string"
}
```

| Status | Description |
|--------|-------------|
| 200 | Profile updated |
| 400 | Invalid ID or duplicate email |
| 500 | Server error |

---

### POST `/api/users/bookmarks` — Auth
Bookmark a place for the authenticated user.

**Body**
```json
{
  "placeId": 1
}
```

**Response `201`**
```json
{
  "id": 1,
  "userId": 1,
  "placeId": 1,
  "type": "SAVE",
  "createdAt": "string"
}
```

| Status | Description |
|--------|-------------|
| 201 | Bookmark created |
| 400 | Missing placeId |
| 409 | Place already bookmarked |
| 500 | Server error |

---

## Places

### GET `/api/places/getAllPlaces`
Return all places with their primary image and categories.

**Response `200`** — array of place objects.

---

### GET `/api/places/getPlaceById/:id`
Return a single place with all images and categories.

**Params**
- `id` — place ID

| Status | Description |
|--------|-------------|
| 200 | Place returned |
| 400 | Invalid ID |

---

### GET `/api/places/nearby`
Return places within a given radius, with optional filters.

**Query params**
| Param | Required | Default | Description |
|-------|----------|---------|-------------|
| `lat` | yes | — | Latitude |
| `lng` | yes | — | Longitude |
| `radius` | no | `2000` | Radius in metres |
| `openNow` | no | — | `true` to filter open places only |
| `hasPromo` | no | — | `true` to filter places with active offers |
| `priceIndex` | no | — | Filter by price range |
| `rating` | no | — | Minimum rating |
| `cuisine` | no | — | Category name(s), repeatable |

**Response `200`** — array of places sorted by distance, each including `distanceMetres` and `distance` fields.

| Status | Description |
|--------|-------------|
| 200 | Places returned |
| 400 | Missing lat or lng |

---

### GET `/api/places/promos`
Return places with active offers within a given radius.

**Query params**
| Param | Required | Default | Description |
|-------|----------|---------|-------------|
| `lat` | yes | — | Latitude |
| `lng` | yes | — | Longitude |
| `radius` | no | `2000` | Radius in metres |

**Response `200`** — array of places sorted by distance, each including `promoTag` and `promoText`.

| Status | Description |
|--------|-------------|
| 200 | Places returned |
| 400 | Missing lat or lng |

---

### GET `/api/places/suggestions`
Return personalised place suggestions ranked by the user's category preferences.

**Query params**
| Param | Required | Default | Description |
|-------|----------|---------|-------------|
| `userId` | yes | — | User to generate suggestions for |
| `lat` | no | — | Latitude — enables distance filtering |
| `lng` | no | — | Longitude |
| `radius` | no | `5000` | Radius in metres (only applied if lat/lng provided) |
| `limit` | no | `10` | Max results |

Places the user has already visited or saved are excluded. Results are sorted by preference score descending, then distance ascending.

| Status | Description |
|--------|-------------|
| 200 | Suggestions returned |
| 400 | Missing userId |

---

### GET `/api/places/wheel-history`
Return the last 10 wheel winners for a user.

**Query params**
| Param | Required | Description |
|-------|----------|-------------|
| `userId` | yes | User ID |

| Status | Description |
|--------|-------------|
| 200 | History returned |
| 400 | Missing userId |

---

### POST `/api/places/wheel-history`
Record a wheel winner for a user.

**Body**
```json
{
  "userId": 1,
  "placeId": 1
}
```

| Status | Description |
|--------|-------------|
| 200 | Recorded |
| 400 | Missing userId or placeId |

---

### POST `/api/places/:placeId/reviews` — Auth
Submit a review for a place.

**Params**
- `placeId` — place ID

**Body**
```json
{
  "rating": 4,
  "content": "string"
}
```

At least one of `rating` or `content` is required. `rating` must be between 1 and 5.

**Response `201`**
```json
{
  "id": 1,
  "placeId": 1,
  "userId": 1,
  "rating": 4,
  "content": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "user": {
    "id": 1,
    "name": "string",
    "profilePicUrl": "string"
  }
}
```

| Status | Description |
|--------|-------------|
| 201 | Review created |
| 400 | Invalid placeId, missing fields, or rating out of range |
| 401 | No valid token |
| 500 | Server error |
