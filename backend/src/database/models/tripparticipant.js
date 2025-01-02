'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TripParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsToMany(models.Trip, { through: models.Comment });
    }
  }
  TripParticipant.init({
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    token:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    cancel_reason: { 
      type: DataTypes.STRING ,
      allowNull: true,
      validate: {
        len: [2, 255]
      }
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'),
      defaultValue: 'cancelled',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TripParticipant',
  });
  return TripParticipant;
};