# Poblaria - Backend

## 🔌 API Communication

In order for the frontend to be able to communicate with the API, **Tuyau** files must be generated.\
Every time a new route/controller is added to the project or a `request.validateUsing` is added in a controller method, this command must be run to update the generated files used by the frontend:

```bash
node ace tuyau:generate
```

## Ace

Ace is a command line framework used by AdonisJS to create and run console commands.

### Useful Ace commands

- `node ace add` - Install and configure a package.
- `node ace configure` - Configure a package after it has been installed.
- `npm run dev` - Start the development HTTP server along with the file watcher to perform restarts on file change with hot module reloading.
- `npm test` - Run tests along with the file watcher to re-run tests on file change.

- `node ace env:add` - Add a new environment variable.

- `node ace generate:key` - Generate a cryptographically secure random application key, replacing the current one in the `.env` file.

- `node ace make:command` - Create a new ace command class.
- `node ace make:controller` - Create a new HTTP controller class.
- `node ace make:event` - Create a new event class.
- `node ace make:exception` - Create a new custom exception class.
- `node ace make:factory` - Make a new factory.
- `node ace make:listener` - Create a new event listener class.
- `node ace make:middleware` - Create a new middleware class for HTTP requests.
- `node ace make:migration` - Make a new migration file.
- `node ace make:model` - Make a new Lucid model.
- `node ace make:preload` - Create a new preload file inside the start directory.
- `node ace make:provider` - Create a new service provider class.
- `node ace make:seeder` - Make a new Seeder file.
- `node ace make:service` - Create a new service class.
- `node ace make:test` - Create a new Japa test file.
- `node ace make:validator` - Create a new file to define VineJS validators.

- `node ace migration:fresh` - Drop all tables and re-migrate the database.
- `node ace migration:refresh` - Rollback and migrate database.
- `node ace migration:reset` - Rollback all migrations.
- `node ace migration:rollback` - Rollback migrations to a specific batch number.
- `node ace migration:run` - Migrate database by running pending migrations.
- `node ace migration:status` - View migrations status.

- `node ace db:seed` - Execute database seeders.
- `node ace db:truncate` - Truncate all tables in database.
- `node ace db:wipe` - Drop all tables, views and types in database.

- `node ace list:routes` - List application routes. This command will boot the application in the console environment.
