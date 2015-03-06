# Fetch

[![Build Status](http://img.shields.io/travis/customelements/fetch/master.svg?style=flat)](https://travis-ci.org/customelements/fetch)
[![Dependencies Status](http://img.shields.io/david/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/fetch.svg?style=flat)](https://david-dm.org/customelements/fetch#info=devDependencies)

> **Attention:** This is a work in progress.

Microservices that fetches packages from [npm](https://www.npmjs.org/) & [Bower](http://bower.io/) which contains the `web-components` keyword. Built with [Node](http://nodejs.org/), [Hapi](http://hapijs.com/), and [Redis](http://redis.io/). Hosted on [Heroku](https://heroku.com/).

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

```json
[
    "bower": {
        "name": "voice-elements",
        "keywords": ["Polymer"]
    },
    "npm": {
        "name": "",
        "keywords": []
    },
    "github": {
        "id": 18821483,
        "name": "voice-elements",
        "full_name": "zenorocha/voice-elements",
        "description": "Web Component wrapper to the Web Speech API, that allows you to do voice recognition and speech synthesis using Polymer",
        "html_url": "https://github.com/zenorocha/voice-elements",
        "homepage": "http://zenorocha.github.io/voice-elements",
        "size": 1472,

        "created_at": "2014-04-16T00:48:46Z",
        "updated_at": "2015-03-02T02:23:32Z",
        "pushed_at": "2014-11-26T18:57:10Z",

        "subscribers_count": 47,
        "open_issues_count": 9,
        "stargazers_count": 972,
        "forks_count": 154,

        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": true,

        "owner": {
            "id": 398893,
            "login": "zenorocha",
            "avatar_url": "https://avatars.githubusercontent.com/u/398893?v=3",
            "html_url": "https://github.com/zenorocha"
        }
    },
    {...}
]
```
---

### PUT `/packages`

1. Fetches `/packages/bower`.
2. Fetches `/packages/npm`.
2. Merges two objects.
3. Saves result data into Redis.

```sh
curl -X PUT fetch.customelements.io/packages
```

---

### GET `/packages`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io/packages
```

```json
[
    {
        "bower": {
            "name": "codepen-embed",
            "keywords": [
                "codepen",
                "polymer",
                "web-components",
                "embed"
            ]
        },
        "npm": {
            "name": "",
            "keywords": []
        },
        "github": {
            "owner": "Jupiterrr",
            "name": "codepen-embed-component"
        }
    },
    {...}
]
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

```json
[
    {
        "bower": {
            "name": "codepen-embed",
            "keywords": [
                "codepen",
                "polymer",
                "web-components",
                "embed"
            ]
        },
        "npm": {
            "name": "",
            "keywords": []
        },
        "github": {
            "owner": "Jupiterrr",
            "name": "codepen-embed-component"
        }
    },
    {...}
]
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

```json
[
    {
        "bower": {
            "name": "",
            "keywords": []
        },
        "npm": {
            "name": "declarative-custom-element",
            "keywords": [
                "web-component",
                "web-components",
                "custom-element"
            ]
        },
        "github": {
            "owner": "kentaromiura",
            "name": "custom-element"
        }
    },
    {...}
]
```

## License

[MIT License](http://webcomponentsorg.mit-license.org/) © WebComponents.org