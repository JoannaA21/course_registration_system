const { DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

//used to encryot password
const bcrypt = require('bcrypt');
const { getStudent_userById } = require('../controllers/studentUserController');

//connect to the database
const sequelize = dbConfig.connect();

const Student_user = sequelize.define(
    'Student_user', //table name 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, 
                isUniqueEmail: async(value) => {
                    const existingUser = await Student_user.findOne({where: {email:value}});
                    if(existingUser){
                        throw new Error ('Email already exists in the database.')
                    }
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Add unique constraint to the username field
            validate: {
              notNull: { msg: 'Username cannot be null.' },
              notEmpty: { msg: 'Username cannot be empty.' },
              isUniqueUsername: async (value) => {
                // Custom validation to check if the username is unique in the database
                const existingUser = await Student_user.findOne({ where: { username: value } });
                if (existingUser) {
                  throw new Error('Username already exists in the database.');
                }
              },
            },
          },
        dob: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        },
        program: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
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
        tableName: 'Student_user',
        timestamps: false,
        hooks: {
            beforeCreate: async(user) => {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                user.password = hashedPassword;
            }
        }
    }
)

// Custom method to verify user password during login
Student_user.prototype.verifyPassword = async function (password) {
    console.log('Provided Password:', password);
    console.log('Hashed Password from DB:', this.password);
  
    const isPasswordValid = await bcrypt.compare(password, this.password);
    console.log('Is password valid?', isPasswordValid);
  
    return isPasswordValid;
};
  
 
module.exports = Student_user;