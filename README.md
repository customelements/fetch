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
        "github": {
            "owner": "Jupiterrr",
            "name": "codepen-embed-component"
        }
    },
    {...}
]
```

---

### PUT `/repos/bower`

1. Fetches `/packages/bower`.
2. Requests GitHub API for each repo.
3. Filters unnecessary keys from each JSON entry.
4. Saves result data into Redis.

```bash
curl -X PUT fetch.customelements.io/repos/bower
```

---

### GET `/repos/bower`

1. Gets data from Redis based on the operation above.

```bash
curl -X GET fetch.customelements.io/repos/bower
```

```json
[
    {
        "id": 27491780,
        "name": "aaa-form-controls",
        "full_name": "Will-in-BC/aaa-form-controls",
        "description": "A polymer element that provides a forms control for CRUD (Create, Retrieve, Update, Delete)",
        "html_url": "https://github.com/Will-in-BC/aaa-form-controls",
        "homepage": "",
        "size": 604,
        "created_at": "2014-12-03T14:47:50Z",
        "updated_at": "2014-12-03T14:47:50Z",
        "pushed_at": "2015-01-01T20:44:13Z",
        "subscribers_count": 1,
        "open_issues_count": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "forks_count": 0,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": true,
        "owner": {
            "id": 9541036,
            "login": "Will-in-BC",
            "avatar_url": "https://avatars.githubusercontent.com/u/9541036?v=3",
            "html_url": "https://github.com/Will-in-BC"
        },
        "bower_name": "aaa-form-controls",
        "bower_keywords": [
            "Polymer",
            "web-components"
        ]
    },
    {...}
]
```

## License

[MIT License](http://webcomponentsorg.mit-license.org/) © WebComponents.org