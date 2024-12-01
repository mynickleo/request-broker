# ✨ Request Broker Full-Stack

Это брокер сервер для отправки отложенных запросов, написанный на нескольких языках - JavaScript (React, Node + Nest), Go, C# Asp.NET Core. Также в проекте используется MongoDB для хранения запросов - `очереди` и `архива`. Как только запрос попадает в брокер, то он отправляется в очередь, после чего будет исполнен за `n` попыток. Если в процессе выполнения запроса возникают ошибки и `n` попыток израсходованы, то запрос попадает в архив со статусом `failed`. Если все ок, то со статусом `success`. Очередь и архив можно посмотреть в UI на клиенте

> This is a server broker for sending delayed requests, written in multiple languages: JavaScript (React, Node + Nest), Go, and C# Asp.NET Core. The project also uses MongoDB to store requests — both the `queue` and the `archive`. Once a request enters the broker, it is added to the queue and executed within `n` attempts. If errors occur during execution and all `n` attempts are exhausted, the request is moved to the archive with a `failed` status. If successful, it is archived with a `success` status. Both the queue and archive can be viewed in the client-side UI

## 🛠️ Используемые технологии | Technologies used
- React.js | Node.js + Nest.js
- Go + Fiber
- C# ASP .NET CORE
- MongoDB
- Mongoose | Mongo.Driver

## 🚀 Основные возможности | Key features
- Добавление запроса в очередь
- Чтение из очереди
- Обработка очереди
- Добавление запроса в архив
- Чтение из архива

> - Adding a request to the queue
> - Reading from the queue
> - Processing the queue
> - Adding a request to the archive
> - Reading from the archive

## 📂 Структура приложения | Project structure
- `client` - React.js
- `server`
- - `csharp` - ASP .NET CORE
- - `go-server` - Go + Fiber
- - `node-server` - Node.js + Nest.js

## ⚙️ Установка | Installation
```bash
git clone https://github.com/mynickleo/request-broker.git
cd request-broker
```

## 🔗 API

**`Очередь | Queue`**
- POST /api/queue
- GET /api/queue

**`Архив | Archive`**
- GET /api/archive

## 📬 Обратная связь | Feedback
Если у вас есть предложения или вы нашли ошибки, создайте Issue или отправьте Pull Request. Если вам понравилось, то можете дать ⭐ этому репозиторию
> If you have suggestions or find any issues, feel free to open an Issue or submit a Pull Request! If you liked it, you can give ⭐ to this repository