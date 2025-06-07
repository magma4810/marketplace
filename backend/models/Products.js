import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

export const Products = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, 
        defaultValue: "",
      },
      count: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vendorInfo: {
        type: DataTypes.STRING,
        allowNull: false,
      }
}, {
    timestamps: false 
  });