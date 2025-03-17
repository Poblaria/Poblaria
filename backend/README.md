# Poblaria - Backend

## Production

To run the backend in production mode, you can use Docker Compose.

To do so, first create a `.env` file (from `.env.example`) and fill in the necessary environment variables.

Then, run the following command:

```bash
DB_MIGRATE=1 docker compose up --build
```

Let's split the command:

- `DB_MIGRATE=1` tells the backend to run the migrations and seed the database before starting the server.
- `docker compose up` starts the containers.
- `--build` rebuilds the images.

You can also start the backend without running the migrations and/or rebuilding the images:

- Start the backend without running the migrations and without rebuilding the images:
```bash
docker compose up
```

- Start the backend running the migrations but without rebuilding the images:
```bash
DB_MIGRATE=1 docker compose up
```

- Start the backend without running the migrations but rebuilding the images:
```bash
docker compose up --build
```

You can also use the `-d` flag to run the containers in the background.

To stop the containers, first press *Ctrl + C* if you are not in detached mode.
Then, run the following command:

```bash
docker compose down
```

If you want also to remove the volumes, use the `-v` flag.
