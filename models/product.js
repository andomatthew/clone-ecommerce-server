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
          msg: 'field is required'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: {
          args: 0,
          msg: 'price input cannot below than 0'
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
          args: 0,
          msg: 'stocks input cannot below than 0'
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