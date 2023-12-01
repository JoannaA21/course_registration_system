const { DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');


//connect to the database
const sequelize = dbConfig.connect();

const Course = sequelize.define(
    'Course',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        courseCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseStartDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseEndDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseDays: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseStartTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseEndTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          updated_at: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },
    {
        tableName: 'Course',
        timestamps: false
    }
)

module.exports = Course;