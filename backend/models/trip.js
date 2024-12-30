'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Trip.init({
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
                isFuture(value) {
                  if (new Date(value) <= new Date()) {
                    throw new Error('Start date must be in the future.');
                  }
                },
              },
    },
    startPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      }
    },
    endPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      }
    },
    status: {
      type: DataTypes.ENUM('planned', 'active', 'suspended'),
      allowNull: false,
      defaultValue: 'planned',
    },
    suspend_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};