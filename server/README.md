# Compilatiion

- Run `npm install` or `yarn install` to install packages.
`cd client && npm install` and `cd server && npm install` or
`cd client && yarn install` and `cd server && yarn install`.


## Create database from migration file

Use the following steps to create the `images` database table.

Using the terminal browse to the _server/_ folder:

1. Run `yarn sequelize init` or `sequelize init` to initialize sequelize.
2. Change the **_username_** and **_password_** values in the `server/api/config/config.json` under `development` according to your local database settings i.e.

```json
  "development": {
    "username": "root",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

3. Run `sequelize migration:create --name create_<table_name>_table` :
   e.g. where _table_name_ is _images_

   - `sequelize migration:create --name create_images_table`
   - A file with name _\<timestamp\>-create_images_table_ is created in the _server/migrations/_ folder.
   - Copy and replace the contents of the file with the following code.

```javascript
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("images", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50)
      },
      image: {
        type: Sequelize.BLOB("long")
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("images");
  }
};
```

4. Run `yarn sequelize db:migrate:undo` or `sequelize db:migrate:undo`
5. Run `yarn sequelize db:migrate` or `sequelize db:migrate`
6. Check your database to see if the **images** table is created

Check your database to make sure a new **images** table is created in the database defined in the  **config.json** file.

Create a `.env` in the root of the application with the following values.

~~~
MYSQL_HOST=<database_host>
MYSQL_USER=<user_name>
MYSQL_PW=<user_password>
MYSQL_DB=<database_name>

# sequelize
OPERATOR_ALIASES=false
FREEZE_TABLENAME=true
PORT=<database_port>
MAX=500
MIN=0
ACQUIRE=30000
IDLE=1000
~~~

- Run server:
  - `cd server`
  - `npm start`
- Run client:
  - `cd client`
  - `npm start`
