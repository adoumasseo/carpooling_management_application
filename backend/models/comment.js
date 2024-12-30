'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Trip, { foreignKey: 'tripId' });
      this.belongsTo(models.TripParticipant, { foreignKey: 'tripparticipantId' });
    }
  }
  Comment.init({
    tripId: {
        type: DataTypes.UUID,
        references: {
          model: 'Trips',
          key: 'id',
        },
      },
      tripparticipantId: {
        type: DataTypes.UUID,
        references: {
          model: 'TripParticipants',
          key: 'id',
        },
      },
    content: { 
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 255]
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};