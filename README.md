## Product Scrapper

Hello there, this is a project to company [Pelando](https://beta.pelando.com.br/destaques) and the challenge is for creating an service to crawl a page for given URL

#### For simplify the project only two websites are allowed:
* [Pontofrio](https://www.pontofrio.com.br/)
* [Centauro](https://www.centauro.com.br/)

If you try another domains you'll get an error saying that the domain is not allowed ... 

```javascript
{
	"error": {
		"message": [
			"Error: This domain is not allowed"
		]
	}
}
```

## Build process
Before you start your project take a look if you already have [docker and docker-compose](https://www.docker.com/) installed on your device.

#### If you have follow these steps:
Check if you have those configs on your .env
```
DATABASE_URL="postgresql://postgres:postgres@db:5432/pelandodb?schema=public"
SERVER_PORT=3000
```
Now that everything is ok just type:
`docker-compose up -d`

And success  🚀 you're ready to run

#### If you don't have docker installed and don't want to use you can do those steps
** Make Sure you have an database working to connect** 

```
DATABASE_URL="postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_IP}:5432/{DATABASE_NAME}?schema=public"
```

```
yarn install or npm install
yarn prisma:generate
yarn prisma:up
yarn start
```

## How it works 
Now that you have the project working on your machine, you can go to [docs](http://localhost:3000/docs) and understand the flow of the service.


