# Pen Dashboard

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/npm-%3E%3D6.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D12.0.0-orange.svg?style=flat-square)

> An app which helps users to setup their Pen node and do actions like cash out cheques, upload and download files or manage your postage stamps.

**Warning: This project is in alpha state. There might (and most probably will) be changes in the future to its API and working. Also, no guarantees can be made about its stability, efficiency, and security at this stage.**


## Table of Contents

- [Install](#install)
- [Usage](#usage)
    - [Terminal](#terminal)
    - [Docker](#docker)
- [Contribute](#contribute)
- [Development](#development)
- [License](#license)

## Install

Install globally with npm. We require Node.js's version of at least 12.x and npm v6.x (or yarn v2.x).

```sh
git clone git@github.com:penguintop/pen-dashboard.git

cd pen-dashboard

yarn install
```

## Deploy

Add to nginx configure

```
location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.

        try_files $uri $uri/ =404;
}

location /files {
        try_files $uri / =200;
}

location /stamps {
        try_files $uri / =200;
}

location /accounting {
        try_files $uri / =200;
}

location /peers {
        try_files $uri / =200;
}

location /settings {
        try_files $uri / =200;
}
```


## Usage

:warning: To successfully connect to the Pen node, you will need to enable the Debug API and CORS. You can do so by setting `cors-allowed-origins: ['*']` and `debug-api-enable: true` in the Pen config file and then restart the Pen node. To see where the config file is, consult the [official Pen documentation]

### Terminal

To start use:
```sh
pen-dashboard
```

This should open the webpage on [`http://localhost:8080`](http://localhost:8080)

### Docker

To build Docker image and run it, execute the following from inside project directory:

```sh
docker build . -t pen-dashboard
docker run --rm -p 127.0.0.1:8080:8080 pen-dashboard
```

Pen dashboard is now available on [`http://localhost:8080`](http://localhost:8080)

### Development

```sh
git clone git@github.com:penguintop/pen-dashboard.git

cd pen-dashboard

yarn install
```

The Pen Dashboard runs in development mode on [http://localhost:3031/](http://localhost:3031/)

## Contribute

There are some ways you can make this module better:

- Consult our [open issues](https://github.com/penguintop/pen-dashboard/issues) and take on one of them
- Help our tests reach 100% coverage!


## License

[BSD-3-Clause](./LICENSE)
