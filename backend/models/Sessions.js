import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

export const Users = sequelize.define('Sessions', {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      expires: {
        type: DataTypes.DATE
      },
      data: {
        type: DataTypes.TEXT
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
}, {
    timestamps: true 
  });


