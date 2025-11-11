# Poblaria

## 📋 Description

**Poblaria** is a web platform that connects people with housing and job opportunities in rural areas. The project aims to revitalize rural regions by facilitating the search for housing and professional opportunities.

## 🏗️ Monorepo Structure

This project uses a monorepo architecture with *npm workspaces*, including:

```
poblaria/
└── apps/
    ├── backend/    # AdonisJS REST API
    ├── frontend/   # Next.js frontend application
    └── shared/     # Shared files between apps like tool configurations
```

The goal of this structure is mainly to have the possibility to automatically share API specifications (with routes and types) from the backend to the frontend.\
Moreover, it allows to manage dependencies and scripts in a centralized way, and it's a proper architecture than two completely separate folders/packages.

## 🔌 API Communication

To communicate between the frontend (**Next.js**) and the backend (**AdonisJS**), we use **Tuyau**, an **AdonisJS** plugin that provides a type-safe API client, automatically generated<sup>1</sup> from the backend routes and types.

In the frontend, there's a file containing the **Tuyau** configuration: `apps/frontend/src/lib/tuyau.ts`.\
It exports a pre-configured **Tuyau** client that can be used throughout the frontend application to make API requests to the backend.\
This `tuyau` client can be used to call the API with routes auto-completed and type-checked, and it automatically adds the authentication token to the requests when available and calls the API with the URL defined in the environment variables.\
However, when making API calls in the frontend, it's better to use server actions (`apps/frontend/src/app/actions/`) to handle the requests on the server side, instead of calling the API directly from React components<sup>2</sup> (normally, there's an action for each API endpoint pre-written by the backend developers).

> <sup>1</sup> To generate the **Tuyau** files in the backend, run the following command in the `apps/backend` folder:
> ```bash
> node ace tuyau:generate
> ```
> This will create/update the necessary files in `apps/backend/.adonisjs/`, and the frontend will automatically use the updated files thanks to the monorepo structure.

> <sup>2</sup> Given that the cookie used for authentication is HTTP-only, it's not accessible from the browser JavaScript, so API calls requiring authentication must be made from the server side. And in general, even for non-authenticated requests, it's better to handle them on the server side to avoid exposing sensitive logic in the frontend and to have a consistent way of handling API calls.

### ℹ️ Example

Here is an example of how to use a "tuyau" action in a **React** component (for sure this isn't a real world example, these routes will never be called as is):

```tsx
"use client";
import { useState, useEffect } from "react";
import register, { type RegisterResponse } from "@actions/auth/register";
import login from "@actions/auth/login";
import logout from "@actions/auth/logout";

export default function User() {
    const [user, setUser] = useState<RegisterResponse | null>(null);

    useEffect(() => {
        void register({
            fullName: null,
            email: "mail@example.xyz",
            password: "password"
        }).then(({ data, error }) => {
            if (error) console.error(error.errors[0].message);
            else setUser(data);
        });
        void login({ email: "mail@example.xyz", password: "password" }).then(
            ({ error }) => {
                if (error) console.error(error.errors[0].message);
                else console.log("Logged in successfully");
            }
        );
        void logout().then(({ error }) => {
            if (error) console.error(error.errors[0].message);
            else console.log("Logged out successfully");
        });
    }, []);

    return (
        <div>
            {user ? (
                <p>Registered user: {user.fullName ?? "No name"}</p>
            ) : (
                <p>No user registered</p>
            )}
        </div>
    );
}
```

## 📄 OpenAPI Documentation

**Tuyau** also provides a package to automatically generate an **OpenAPI** documentation from the backend routes and types.

To access this documentation, simply start the backend server and navigate to `http://localhost:3333/docs` in your browser.\
You can also access the raw **OpenAPI** specification in JSON format at `http://localhost:3333/openaapi`.

⚠️ Warning: in production mode, the documentation is not available by default.\
The `http://localhost:3333/docs` will display nothing, and to make the raw specification available, you first need to generate it running the following command in the `apps/backend` folder:
```bash
node ace tuyau:generate:openapi
```
However, it's recommended to do that to avoid exposing sensitive information about the API in production.

> Notes about **Tuyau**:
> - It doesn't detect errors handled through middleware. So for example, 401 Unauthorized errors will be detected as errors but there will be no auto-completion for status 401.
> - When serialized, an **AdonisJS** model is always of type `ModelObject`, which is pretty similar to `any`. So when a route returns a model instance, **Tuyau** cannot infer the actual type of the model and will use `ModelObject` instead. To solve this, we use DTOs (Data Transfer Objects) to define the exact shape of the data returned by the API.
>
> For more information about **Tuyau**, visit the official documentation: https://tuyau.julr.dev.

## 🐳 Docker

There's a `docker-compose.yml` file available in the root of the monorepo. It allows to run the backend and the related database<sup>1</sup> (**PostgreSQL**) using Docker services.

> <sup>1</sup> In the future, the frontend will also be added to the **Docker** setup.

### 🛠️ Usage

To use it, you first need to have a `.env` file at the root of the monorepo. You can copy the `.env.example` and edit it if necessary - this `.env.example` is pretty similar to the one in the `apps/backend` folder, but given that **Docker Compose** cannot use a `.env` file inside a subfolder, it's placed at the root of the monorepo.

#### 🚀 Starting the Services

To start the backend with the database, run the following command from the root of the monorepo:

```bash
DB_MIGRATE=1 docker compose up --build
```

Let's split the command:

- `DB_MIGRATE=1` tells the backend to run the migrations and seed the database before starting the server.
- `docker compose up` starts the services.
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

You can also use the `-d` flag to run the services in the background.

You can also start specific services by specifying their names after the `up` command. For example, to start only the database:

```bash
docker compose up db
```

You may use this setup during the development of the backend to avoid installing **PostgreSQL** locally on your machine.\
To do so, run these commands:

- Start all the services a first time (with migrations and building the images). Even the backend is started so the database is properly initialized, otherwise the `DB_MIGRATE` variable would have no effect:

```bash
DB_MIGRATE=1 docker compose up --build
```

- Stop the services (_Ctrl + C_ if you are not in detached mode and `docker compose down`. ⚠️ No `-v` flag, otherwise the database and its initial data would be deleted).
- Start only the database service - with `-d` so it runs in the background and you can even close the terminal:

```bash
docker compose up -d db
```

#### 🛑 Stopping the Services

To stop the services, first press _Ctrl + C_ if you are not in detached mode.
Then, run the following command:

```bash
docker compose down
```

If you want also to remove the volumes, use the `-v` flag:

```bash
docker compose down -v
```
