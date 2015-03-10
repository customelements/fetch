# Fetch

[![Build Status](http://img.shields.io/travis/customelements/fetch/master.svg?style=flat)](https://travis-ci.org/customelements/fetch)
[![Dependencies Status](http://img.shields.io/david/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch#info=devDependencies)

> Microservices that fetches GitHub data from certain [npm](https://www.npmjs.org/) & [bower](http://bower.io/) packages.

Built with [Node](http://nodejs.org/), [Hapi](http://hapijs.com/), and [Redis](http://redis.io/). Hosted on [Heroku](https://heroku.com/). Monitored on [New Relic](https://newrelic.com/).

## APIs

### PUT `/`

1. Fetches `/packages`.
2. Requests GitHub API for each repo.
3. Filters unnecessary keys from each JSON entry.
4. Saves result data into Redis.

```bash
curl -X PUT fetch.customelements.io
```

---

### GET `/`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io
```

```js
{
    "22607013": {
        "bower": {
            "name": "amazeui",
            "keywords": ["web-components"]
        },
        "npm": {
            "name": "amazeui",
            "keywords": ["web-components"]
        },
        "github": {
            "id": 22607013,
            "name": "amazeui",
            "full_name": "allmobilize/amazeui",
            "description": "Amaze UI, a mobile-first and modular front-end framework.",
            "html_url": "https://github.com/allmobilize/amazeui",
            "homepage": "http://amazeui.org/",
            "size": 20935,
            "created_at": "2014-08-04T14:23:37Z",
            "updated_at": "2015-03-10T10:35:39Z",
            "pushed_at": "2015-03-09T07:46:24Z",
            "subscribers_count": 304,
            "open_issues_count": 28,
            "stargazers_count": 2577,
            "forks_count": 855,
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "owner": {
                "id": 3197643,
                "login": "allmobilize",
                "avatar_url": "https://avatars.githubusercontent.com/u/3197643?v=3",
                "html_url": "https://github.com/allmobilize"
            }
        }
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
        },
        "npm": {}
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
        "bower": {},
        "npm": {
            "name": "input-password",
            "keywords": ["web-components"]
        }
    },
    {...}
}
```

## License

[MIT License](http://webcomponentsorg.mit-license.org/) © WebComponents.org