'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Cart, foreignKey: 'productId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'field is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: { name: 'empty field', message: 'field cannot be empty' }
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: {
          args: [0],
          msg: 'input cannot below than 0'
        },
        notEmpty: {
          args: true,
          msg: 'field cannot be empty'
        }
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'input cannot below than 0'
        },
        notEmpty: {
          args: true,
          msg: 'field cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};