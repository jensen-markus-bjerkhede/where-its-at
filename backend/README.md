# Where it's @
Backend Service to handle events, tickets and verifying of tickets.

## Installation
### Installation dependencies


Use the package manager [npm](https://www.npmjs.com/) to install dependencies.


```bash
npm install
```

## Usage


Run the application with:
```bash
npm run start
```

### Example of Register Admin
```bash
curl --request POST \
  --url http://localhost:3000/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user@youremail.com",
	"role": "admin",
	"password": "password"
}'
```

### Example of Register Staff
```bash
curl --request POST \
  --url http://localhost:3000/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "worker@youremail.com",
	"role": "staff",
	"password": "password"
}'
```

### Example of Login Admin
```bash
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user@youremail.com",
	"password": "password"
}'
```
Copy the response token and save it for later.

### Example of Create Event
```bash
curl --request POST \
  --url http://localhost:3000/events/create \
  --header 'Authorization: Bearer {your saved response token here}' \
  --header 'Content-Type: application/json' \
  --data '{
	"artist": "The Band",
	"place": "The Stadium",
	"date": "2020-12-17T15:24:00",
	"price": 999,
	"duration": 4
}'
```

## Contributing

[Link to repository](https://github.com/jensen-markus-bjerkhede/where-its-at)

## Owners
Markus Bjerkhede

