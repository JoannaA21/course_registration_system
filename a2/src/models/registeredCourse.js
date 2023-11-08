const { DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

//connect to the database
const sequelize = dbConfig.connect();

const RegisteredCourse = sequelize.define(
    'RegisteredCourse',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        student_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'RegisteredCourse',
        timestamps: false
    }
)

module.exports = RegisteredCourse;