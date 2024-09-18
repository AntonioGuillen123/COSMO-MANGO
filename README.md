
# COSMO-MANGO

##### Welcome to COSMO-MANGO, the enigmatic platform where the secrets of the universe wait to be discovered! Join the search for mysteries as we celebrate World UFO Day and unravel the enigmas that lie beyond our understanding...



## Screenshots

#### Home Page
![Home Page Screenshot](https://i.ibb.co/Xyfqb3d/imagen-2024-05-14-123632731.png)

#### Cart Page
![Cart Page Screenshot](https://i.ibb.co/Vw2N8rQ/imagen-2024-05-14-123758692.png)


## Tech Stack

**Client:** JS Vanilla, Bootstrap

**Server:** Node, Express

**Database:** MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### APPLICATION PORT

`PORT`

#### DB CONNECTION

`CONNECTIONSTRING`

`MONGO_INITDB_ROOT_USERNAME` (docker-compose.yml)

`MONGO_INITDB_ROOT_PASSWORD` (docker-compose.yml)

#### FLAG

`DISCOUNT_FOR_FLAG`

`FLAG`




## Run Locally

Change the CONNECTIONSTRING variable to the **URL Of Your DB**

Go to the project directory

```bash
  cd app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Deployment

To deploy this project run with docker-compose

```bash
  docker-compose up -d --build
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

