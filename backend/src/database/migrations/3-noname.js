'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Trips", deps: [Users, Users]
 * createTable "TripParticipants", deps: [Users, Users]
 * createTable "Comments", deps: [Trips, TripParticipants, Trips, TripParticipants]
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2024-12-30T11:15:30.355Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Trips",
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
                    "startDate": {
                        "type": Sequelize.DATE,
                        "field": "startDate",
                        "allowNull": false
                    },
                    "startPlace": {
                        "type": Sequelize.STRING,
                        "field": "startPlace",
                        "allowNull": false
                    },
                    "endPlace": {
                        "type": Sequelize.STRING,
                        "field": "endPlace",
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.ENUM('planned', 'active', 'suspended'),
                        "field": "status",
                        "defaultValue": "planned",
                        "allowNull": false
                    },
                    "suspend_reason": {
                        "type": Sequelize.STRING,
                        "field": "suspend_reason",
                        "allowNull": true
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
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "userId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Users",
                            "key": "id"
                        },
                        "allowNull": true
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
                "TripParticipants",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "unique": true,
                        "primaryKey": true,
                        "defaultValue": Sequelize.UUIDV4
                    },
                    "token": {
                        "type": Sequelize.STRING,
                        "field": "token",
                        "unique": true,
                        "allowNull": true
                    },
                    "cancel_reason": {
                        "type": Sequelize.STRING,
                        "field": "cancel_reason",
                        "allowNull": true
                    },
                    "status": {
                        "type": Sequelize.ENUM('confirmed', 'pending', 'cancelled'),
                        "field": "status",
                        "allowNull": false,
                        "defaultValue": "cancelled"
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
                    "userId": {
                        "type": Sequelize.UUID,
                        "field": "userId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Users",
                            "key": "id"
                        },
                        "allowNull": true
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
                "Comments",
                {
                    "tripId": {
                        "type": Sequelize.UUID,
                        "field": "tripId",
                        "references": {
                            "model": "Trips",
                            "key": "id"
                        }
                    },
                    "tripparticipantId": {
                        "type": Sequelize.UUID,
                        "field": "tripparticipantId",
                        "references": {
                            "model": "TripParticipants",
                            "key": "id"
                        }
                    },
                    "content": {
                        "type": Sequelize.STRING,
                        "field": "content",
                        "allowNull": true
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
            params: ["Comments", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Trips", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["TripParticipants", {
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
