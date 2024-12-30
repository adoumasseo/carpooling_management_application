'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Companies", deps: []
 * createTable "Users", deps: [Companies]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2024-12-30T09:07:42.755Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Companies",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "unique": true,
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address",
                        "unique": true,
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "unique": true,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Users",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "unique": true,
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "unique": true,
                        "allowNull": false
                    },
                    "role": {
                        "type": Sequelize.ENUM('super_admin', 'company_admin', 'user'),
                        "field": "role",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "CompanyId": {
                        "type": Sequelize.UUID,
                        "field": "CompanyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Companies",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["Companies", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
