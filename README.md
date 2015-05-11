# Fetch

[![Build Status](http://img.shields.io/travis/customelements/fetch/master.svg?style=flat)](https://travis-ci.org/customelements/fetch)
[![Dependencies Status](http://img.shields.io/david/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch#info=devDependencies)

> Microservices that fetches GitHub data from certain [npm](https://www.npmjs.org/) & [bower](http://bower.io/) packages.

Built with [Node](http://nodejs.org/), [Hapi](http://hapijs.com/), and [Redis](http://redis.io/). Hosted on [Heroku](https://heroku.com/). Monitored on [New Relic](https://newrelic.com/).

## API endpoints

### PUT `/repos`

1. Fetches `/packages`.
2. Requests GitHub API for each repo.
3. Filters unnecessary keys from each JSON entry.
4. Saves result data into Redis.

```bash
curl -X PUT fetch.customelements.io/repos
```

---

### GET `/repos`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io/repos
```

```js
{
    "22607013": {
        id: 2274210,
        name: "dtreemap",
        owner: "ibm-js",
        description: "TreeMap Custom Element",
        created_at: "2011-08-26T13:32:32Z",
        updated_at: "2015-05-05T11:36:27Z",
        stargazers_count: 9,
        forks_count: 8
    },
    {...}
}
```

---

### PUT `/packages`

1. Fetches `/packages/bower`.
2. Fetches `/packages/npm`.
3. Aggregates packages that contains the same GitHub repo.
4. Merges the two arrays.
5. Saves result data into Redis.

```sh
curl -X PUT fetch.customelements.io/packages
```

---

### GET `/packages`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io/packages
```

```js
{
    "kentaromiura/custom-element": {
        "bower": {
            "name": "custom-element",
            "keywords": ["web-components"]
        },
        "npm": {
            "name": "declarative-custom-element",
            "keywords": ["web-components"]
        }
    },
    {...}
}
```

---

### PUT `/packages/bower`

1. Fetches all packages from Bower that contains the `web-components` keywords.
2. Filters unnecessary keys from each JSON entry.
3. Saves result data into Redis.

```sh
curl -X PUT fetch.customelements.io/packages/bower
```

---

### GET `/packages/bower`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io/packages/bower
```

```js
{
    "zenorocha/voice-elements": {
        "bower": {
            "name": "voice-elements",
            "keywords": ["web-components"]
        }
    },
    {...}
}
```

---

### PUT `/packages/npm`

1. Fetches all packages from npm that contains the `web-components` keywords.
2. Fetches each package metadata.
3. Filters unnecessary keys from each JSON entry.
4. Saves result data into Redis.

```sh
curl -X PUT fetch.customelements.io/packages/npm
```

---

### GET `/packages/npm`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io/packages/npm
```

```js
{
    "jorgecasar/input-password": {
        "npm": {
            "name": "input-password",
            "keywords": ["web-components"]
        }
    },
    {...}
}
```

---

### GET `/limit`

Returns GitHub's API current rate limit.

```bash
curl -X GET fetch.customelements.io/limit
```

```js
{
    "limit": 5000,
    "remaining": 5000,
    "reset": 1427122269
}
```

## License

[MIT License](http://webcomponentsorg.mit-license.org/) © WebComponents.org