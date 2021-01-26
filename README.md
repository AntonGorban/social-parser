# social-parser

Languages: [EN](https://github.com/AntonGorban/social-parser/blob/main/README.md) | [RU](https://github.com/AntonGorban/social-parser/blob/main/README.RU.md)

> Shows the metric of site visits and metrics from VKontakte, Telegram, YouTube, Odnoklassniki, Instagram and Twitter.

- [social-parser](#social-parser)
	- [Getting started](#getting-started)
		- [Installing](#installing)
		- [APIs](#apis)
			- [VK](#vk)
				- [Text instruction](#text-instruction)
				- [Images instruction](#images-instruction)
			- [Telegram](#telegram)
			- [YouTube](#youtube)
				- [Text instruction](#text-instruction-1)
				- [Images instruction](#images-instruction-1)
			- [Instagram](#instagram)
		- [Resourses](#resourses)

## Getting started

### Installing

First you need to download the release of the project from `github` or use the command

```Shell
git clone https://github.com/AntonGorban/social-parser.git
```

Also you need to install [Node.js](https://nodejs.org) ( latest or LTS version ).

After these steps, start the console in the project directory and run

```Shell
npm i
```

Then you need to fill in the files `api.json` and `resources.json`.After filling, you can run the program by executing

```Shell
npm run start
```

### APIs

The parser uses the API to work:

- VKontakte
- Telegram Bot
- YouTube Data API v3
- Instagram

To work, you need to get access tokens and write them to the file `api.json`, an example of this file is `api-example.json`, just enter the data into it and remove the `-example` from the name.

`api.json` should look like this:

```json
{
  "vk": "tokenVkAPI",
  "tg": "tokenTelegramBot",
  "youTube": "tokenYouTubeDataAPIv3",
  "inst": {
    "login": "instagramLogin",
    "password": "instagramPassword"
  }
}
```

#### VK

##### Text instruction

You need to get a token from the `VK API`, you can get it on the [site](https://vkhost.github.io/).Go to it, press the `VK API` button, confirm access to your account.After copying the token from the URL, the token is in the `GET` parameter of `access_token` ( between `access_token =` and `&expires_in` ).Copy your token and paste it with the `vk` key value in `api.json`.

```json
{
  "vk": "9eaf...52bbfe"
}
```

##### Images instruction

1. ![get VK API token instruction ( 1 )](https://i.imgur.com/TzPqYiC.png)
2. ![get VK API token instruction ( 2 )](https://i.imgur.com/xvhUKDq.png)
3. ![get VK API token instruction ( 3 )](https://i.imgur.com/Q8iQ1Nt.png)

#### Telegram

The parser uses `Telegram Bot Api` to get information about the number of channel subscribers.The token can be obtained through the telegram bot [BotFather](https://t.me/BotFather).You need to send him the command `/newbot` and after a little dialogue you will receive a token.it needs to be inserted with the value of the `tg` key in `api.json`.

```json
{
  "tg": "69...Kf"
}
```

#### YouTube

##### Text instruction

You need a token `YouTube Data API v3`.To get it, go to [site](https://console.developers.google.com/apis/library/youtube.googleapis.com), log in with your Google account and enable the API.Then create credentials:

- API: `YouTube Data API v3`
- Where to call: `Web server (e.g. node.js, Tomcat)`
- Data: `Public data`

Confirm and you will receive your token.it needs to be inserted with the value of the `tg` key in `api.json`.

```json
{
  "youTube": "AI...Bk"
}
```

##### Images instruction

1. ![get YouTube Data API v3 token instruction ( 1 )](https://i.imgur.com/YUkhN72.png)
2. ![get YouTube Data API v3 token instruction ( 2 )](https://i.imgur.com/iH6oCz1.png)
3. ![get YouTube Data API v3 token instruction ( 3 )](https://i.imgur.com/0W5OR2J.png)
4. ![get YouTube Data API v3 token instruction ( 4 )](https://i.imgur.com/nFWe0Mp.png)

#### Instagram

Also, the parser needs to log in with the Instagram account.To do this, add `Instagram` authorization data to `api.json`.

```json
{
  "inst": {
    "login": "instagramLogin",
    "password": "instagramPassword"
  }
}
```

### Resourses

All the resources you need for parsing need to be written to the `resources.json` file, an example of this file is `resources-example.json`, just enter the data into it and remove the `-example` from the name.

```json
{
  "resource1": {
    "name": "resourceName",
    "url": "https://resourceUrl",
    "metricUrl": "resourceUrl",
    "vk": "vkId",
    "tg": "@telegramId",
    "youTube": "youTubeChanelId",
    "ok": null,
    "inst": null,
    "tw": null
  },
  "resource2": {
    "name": "resourceName",
    "url": "https://resourceUrl",
    "metricUrl": "resourceUrl",
    "vk": "vkId",
    "tg": "@telegramId",
    "youTube": null,
    "ok": "okGroupId",
    "inst": "instagramUserId",
    "tw": "twitterUserId"
  }
}
```

Fields:

- `"resource1"` is the service name of the resource, you can call it whatever you want, but preferably in `snake_case`, `cebab-case` or `camelCase` [ example: `gitHub` ]
- `name` is the full name of the resource, you can write whatever you want there [ example: `github` or `github home page` ]
- `url` is the URL of the main resource page ( written from `http://` / `https://` ( inclusive ), up to the first character `/` or up to `GET` parameters ) [ example: `https : // github.com` ]
- `metricUrl` is the URL of the main resource page ( written from `http://` / `https://`, up to the first character `/` or up to `GET` parameters ) [ example: `github.com` ]
- `vk` is the id of the group `VKontakte`, the id is written in the link [ example: for `https://vk.com/githubtrends` will be `githubtrends` ]
- `tg` is the id of the `Telegram` channel, the id is written in the link [ example: for `https://t.me/github_repos` will be `@ github_repos` ]
- `youTube` is the id of the `youTube` channel, the id is not always written in the link ( in order to get the id, go to any channel video and click on the channel link under the video ( `https://www.youtube.com/github` -> `https://www.youtube.com/watch?v=2m9nUP-e8Co` -> `https://www.youtube.com/channel/UC7c3Kb6jYCRj4JOHHZTxKsQ` ) ) [ example: for `https://www.youtube.com/github` will be `UC7c3Kb6jYCRj4JOHHZTxKsQ` ]
- `ok` is the id of the `Odnoklassniki` group, the id is written in the link [ example: for `https://ok.ru/bbcrussian` will be `bbcrussian` ]
- `inst` is the id of the user `Instagram`, to get it, go to the user page, open the page code ( `RMB` -> `View the page code` ) -> open the search on the page ( `CTRL + f` ) -> enter `profilePage_` -> there will be a line like `"profilePage_19318909"` from `_` to `"` - this is the desired id [ example: for `https://www.instagram.com/github` will be `19318909` ]
- `tw` is the id of the user `Twitter`, id is written in the link [ example: for `https://twitter.com/github` it will be `github` ]

If the resource does not have any social network, or you do not want to process it, then enter the value `null`.

If you want to parse multiple resources, then write them with `,` when writing to `resources.json`.

Example:

```json
{
  "gitHub": {
    "name": "Octocat hub",
    "url": "https://github.com",
    "metricUrl": "github.com",
    "vk": null,
    "tg": null,
    "youTube": "UC7c3Kb6jYCRj4JOHHZTxKsQ",
    "ok": null,
    "inst": "19318909",
    "tw": "github"
  },
  ...
}
```
