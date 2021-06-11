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

### Register Admin
```bash
curl --request POST \
  --url http://localhost:3000/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "{user@youremail.com}",
	"role": "{admin}",
	"password": "{password}"
}'
```

### Login Admin
```bash
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "{user@youremail.com}",
	"password": "{password}"
}'
```
Copy the response token and save it for later.

### Create Event
```bash
curl --request POST \
  --url http://localhost:3000/events/create \
  --header 'Authorization: Bearer {your saved response token here}' \
  --header 'Content-Type: application/json' \
  --data '{
	"artist": "{Artist name}",
	"place": "{Place}",
	"date": "{ Date I.E 1995-12-17T15:24:00}",
	"price": {195},
	"duration": {whole hours I.E 3}
}'
```

## Contributing

[Link to repository](https://github.com/jensen-markus-bjerkhede/where-its-at)

## Owners
Markus Bjerkhede

