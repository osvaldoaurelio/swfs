# STEP BY STEP - How to create this application backend

**the comands bellow must run inside project dir at terminal**

---

create the initial struct dir

```
$ mkdir src src/controllers src/models src/routes && touch src/app.ts src/server.ts src/routes/index.ts
```

---

init node project and create the package.json file

```
$ yarn init -y
```

install typescript and ts-node-dev to use them in the project

```
$ yarn add -D typescript ts-node-dev
```

### additions to the package.json file

```
  "scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```

---

init typescript project and create a tsconfig.json file

```
$ npx tsc --init
```

### changes at the tsconfig.json file

* ~~"target": "es5",~~ "target": "es6",
* ~~// "outDir": "./",~~ "outDir": "./dist",
* ~~// "rootDir": "./",~~ "rootDir": "./src",

---

init a git dir and create the .gitignore file

```
$ git init && echo ".DS_Store\nnode_modules\ndist\n.env\n" >> .gitignore
```

---

install express and the types that belong to it to manage requests, routing...

```
$ yarn add express && yarn add -D @types/express
```

---

install sequelize and mysql2 to manage SQL queries with javascript, and the types validator as sequelize uses this library

```
$ yarn add sequelize mysql2 && yarn add -D @types/validator
```

---

install docker with

```
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sh get-docker.sh 
```

*curl is required and can be installed with - `$ sudo apt install curl`

---

create a container mysql with

```
$ docker run --name pitu-mysql-local -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:5.7
```

Instantiate sequelize with this URI: `'mysql://root:root@localhost:3306/pitu'`

*before you run the application you must create a database named as "pitu"

*to start the container run `$ docker container start pitu-mysql-local`

---

install cors and the types that belong to it to manager the access to backend from diferrent origins

```
$ yarn add cors && yarn add -D @types/cors
```

---

to run the application server

```
$ yarn dev
```

---

to build the application

```
$ yarn build
```

---

