'use strict';
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const { Model } = require('sequelize');
const validator = require('validator')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Company, {
        foreignKey: 'companyId'
      });
      this.hasMany(models.Trip);
      this.hasMany(models.TripParticipant);
    }

    /**
     * Instance method to verify password.
     * @param {string} password Plain text password to verify.
     * @returns {Promise<boolean>}
     */
    async isValidPassword(password) {
      try {
        return await bcrypt.compare(password, this.password);
      } catch (err) {
        console.error('Error while comparing password:', err);
        return false;
      }
    }
  }

  User.init(
    {
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
          len: [2, 50],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
       
        validate: {
          isStrongPassword(value) {
            if (!validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            })) {
              throw new Error('Password must include at least 8 characters, one lowercase, one uppercase, one number, and one special character.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.ENUM('super_admin', 'company_admin', 'user'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate(async (user) => {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (e) {
      throw new Error('Error while hashing password.'); 
    }
  });
  
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      } catch (e) {
        throw new Error('Error while hashing password.');
      }
    }
  });
  
  return User;
};
