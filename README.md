## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Technology Choices

- NestJS: Chosen for its scalability and modular structure, ideal for larger applications.
- TypeScript: Provides static type checking, improving code quality.
- PostgreSQL: A robust choice with which I have prior experience.
- TypeORM: Used for effective database query mapping.
  Nanoid: Selected for generating unique short URLs; it’s user-friendly and widely adopted.
- typeorm-extension: Chosen for data seeding due to its popularity and updates.
