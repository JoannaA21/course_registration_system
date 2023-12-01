const { DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');


//connect to the database
const sequelize = dbConfig.connect();

const ContactForm = sequelize.define(
    'ContactForm', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        query: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        response: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'ContactForm',
        timestamps: false
    }
)


module.exports = ContactForm;