# Fetch

[![Build Status](http://img.shields.io/travis/customelements/fetch/master.svg?style=flat)](https://travis-ci.org/customelements/fetch)
[![Dependencies Status](http://img.shields.io/david/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch#info=devDependencies)

> **Attention:** This is a work in progress.

Microservices that fetches packages from [npm](https://www.npmjs.org/) & [Bower](http://bower.io/) which contains the `web-components` keyword. Built with [Node](http://nodejs.org/), [Hapi](http://hapijs.com/), and [Redis](http://redis.io/). Hosted on [Heroku](https://heroku.com/).

## APIs

### PUT `/packages/bower`

1. Fetches all packages from Bower that contains the `web-components` keywords.
2. Filters unnecessary keys from each JSON entry.
3. Saves result data into Redis.

```sh
curl -X PUT fetch.customelements.io/packages/bower
```

### GET `/packages/bower`

1. Gets data from Redis based on the operation above.

```sh
curl -X GET fetch.customelements.io/packages/bower
```

```js
[
    {
        "name": "codepen-embed",
        "keywords": [
            "codepen",
            "polymer",
            "web-components",
            "embed"
        ],
        "github_repo": {
            "owner": "Jupiterrr",
            "name": "codepen-embed-component"
        }
    },
    {...}
]
```

### PUT `/repos/bower`

1. Fetches `/packages/bower`.
2. Requests GitHub API for each repo.
3. Filters unnecessary keys from each JSON entry.
4. Saves result data into Redis.

```sh
curl -X PUT fetch.customelements.io/repos/bower
```

## Install

```sh
$ git clone git@github.com:customelements/fetch.git
$ npm install
```

## Setup

```sh
$ export GITHUB_CLIENT_ID
$ export GITHUB_CLIENT_SECRET
$ export REDISTOGO_URL
```

## Usage

```sh
$ node server
```

## License

[MIT License](http://webcomponentsorg.mit-license.org/) © WebComponents.org