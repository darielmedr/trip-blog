# TRIP BLOG

API REST Blog to share amazing trip adventures

## Getting Started

Use this project on your local machine for development and testing purposes.

### Download and install dependencies

```shell
~$ git clone https://github.com/darielmedr/trip-blog.git
~$ cd trip-blog
~$ npm install
```

### Usage

```shell
npm run start:dev
```

## General configuration

### Environment variables

| Name         | Description                    | Default Value                         |
| ------------ | ------------------------------ | ------------------------------------- |
| NODE_ENV     | Production or development mode | `development`                         |
| API_HOST     | API host                       | `localhost`                           |
| API_PORT     | API port                       | `3000`                                |
| DB_URI       | API DB URI connectio           | `mongodb://localhost:27017/trip-blog` |

## Built With

- [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Typescript](https://www.typescriptlang.org/) - typed JavaScript

## Versioning

- [SemVer](http://semver.org/) for versioning.

### Generate Release

```shell
npm run release
```
