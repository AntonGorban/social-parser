# social-parser

Languages: [EN](https://github.com/AntonGorban/social-parser/blob/main/README.md) | [RU](https://github.com/AntonGorban/social-parser/blob/main/README.RU.md)

> Показывает метрику посещений сайта и метрики из ВКонтакте, Telegram, YouTube, Одноклассники, Instagram и Twitter.

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

Сначала вам нужно скачать релиз проекта c `github` или воспользоваться командой

```Shell
git clone https://github.com/AntonGorban/social-parser.git
```

Так-же вам нужно установить [Node.js](https://nodejs.org) ( latest или LTS версию ).

После данных действий запустите консоль в директории проекта и выполните

```Shell
npm i
```

После чего вам нужно заполнить файлы `api.json` и `resources.json`. После заполнения можете запускать программу, выполнив

```Shell
npm run start
```

### APIs

Для работы парсер использует API:

- ВКонтакте
- Telegram Bot
- YouTube Data API v3
- Instagram

Для работы нужно получить токены доступа и записать их в файл `api.json`, пример данного файла `api-example.json`, просто впишите в него данные и уберите `-example` из названия.

`api.json` должен выглядеть так:

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

Вам нужно получить токен от `VK API`, получить его можно на [сайте](https://vkhost.github.io/). Переходим на него, нажимаем кнопку `VK API`, подтверждаем доступ к аккаунту. После копируем токен из URL-адреса, токен находится в `GET` параметре `access_token` ( между `access_token=` и `&expires_in` ). Скопируйте свой токен в вставьте его значением ключа `vk` в `api.json`.

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

Парсер использует `Telegram Bot Api` для получения информации о количестве подписчиков канала. Токен можно получить через telegram бота [BotFather](https://t.me/BotFather). Нужно отправить ему команду `/newbot` и после небольшого диалога вы получите токен. его нужно вставить значением ключа `tg` в `api.json`.

```json
{
  "tg": "69...Kf"
}
```

#### YouTube

##### Text instruction

Вам нужен токен `YouTube Data API v3`. Для его получения перейдите на [сайт](https://console.developers.google.com/apis/library/youtube.googleapis.com), авторизуйтесь под учетной записью Google и включите API. После создайте учетные данные:

- API: `YouTube Data API v3`
- Откуда вызывать: `Веб-сервер (например node.js, Tomcat)`
- Данные: `Общедоступные данные`

Подтвердите и вы получите свой токен. его нужно вставить значением ключа `youTube` в `api.json`.

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

Так же парсеру нужно авторизоваться под учетной записью `Instagram`. Для этого добавьте в `api.json` данные для авторизации в `Instagram`.

```json
{
  "inst": {
    "login": "instagramLogin",
    "password": "instagramPassword"
  }
}
```

### Resourses

Все нужные вам для парсинга ресурсы нужно записать в файл `resources.json`, пример данного файла `resources-example.json`, просто впишите в него данные и уберите `-example` из названия.

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

Поля:

- `"resource1"` - это служебное название ресурса, вы можете называть его как угодно, но желательно в `snake_case`, `cebab-case` или `camelCase` [ пример: `gitHub` ]
- `name` - это полное название ресурса, вы можете писать там что угодно [ пример: `github` или `github home page` ]
- `url` - это URL-адрес главной страницы ресурса ( пишется от `http://` / `https://` ( включительно ), до первого знака `/` или до `GET` параметров ) [ пример: `https://github.com` ]
- `metricUrl` - это URL-адрес главной страницы ресурса ( пишется от `http://` / `https://`, до первого знака `/` или до `GET` параметров ) [ пример: `github.com` ]
- `vk` - это id группы `ВКонтакте`, id написан в ссылке [ пример: для `https://vk.com/githubtrends` будет `githubtrends` ]
- `tg` - это id канала `Telegram`, id написан в ссылке [ пример: для `https://t.me/github_repos` будет `@github_repos` ]
- `youTube` - это id канала `youTube`, id не всегда написанно в ссылке ( для того чтобы получить id перейдите на любое видео канала и нажмите на ссылку канала под видео ( `https://www.youtube.com/github` -> `https://www.youtube.com/watch?v=2m9nUP-e8Co` -> `https://www.youtube.com/channel/UC7c3Kb6jYCRj4JOHHZTxKsQ` ) ) [ пример: для `https://www.youtube.com/github` будет `UC7c3Kb6jYCRj4JOHHZTxKsQ` ]
- `ok` - это id группы `Одноклассники`, id написан в ссылке [ пример: для `https://ok.ru/bbcrussian` будет `bbcrussian`]
- `inst` - это id пользователя `Instagram`, для его получения перейдите на страницу пользователя, откройте код страницы ( `ПКМ` -> `Просмотр кода страницы` ) -> откройте поиск на странице ( `CTRL + f` ) -> введите `profilePage_` -> найдется строка подобная `"profilePage_19318909"` от `_` до `"` - это искомый id [ пример: для `https://www.instagram.com/github` будет `19318909` ]
- `tw` - это id пользователя `Twitter`, id написан в ссылке [ пример: для `https://twitter.com/github` будет `github`]

Если какой либо социальной сети нет у ресурса, либо вы не хотите его обрабатывать, то вписывайте в значение `null`.

Если вы хотите парсить несколько ресурсов, то при записи в `resources.json` записывайте их через `,`.

Пример:

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
