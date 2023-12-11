const RegisteredCourse = require('../models/registeredCourse');
const {
    Sequelize
} = require('sequelize');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

//Add registered course for a specific student
const studentRegister_ForACourse = async (req, res, next) => {
    const {
        courseid,
        id
    } = req.body
    console.log(req.body)
    try {
        const rCourse = await RegisteredCourse.create({
            course_id: courseid,
            student_id: id,
            created_at: today.toISOString(),
            updated_at: today.toISOString()
        });
        res.status(201).json(rCourse);
    } catch (err) {
        next(err);
        console.log('error: ' + err.message);
    } 
}


//Delete registered course of a student
const studentDropsACourse = async (req, res, next) => {
    // const {
    //     id
    // } = req.params
    const {
        courseid,
        id
    } = req.body
    try {
        // const dropCourse = await RegisteredCourse.findByPk(id);
        const dropCourse = await RegisteredCourse.findOne({
            where: Sequelize.or({
                course_id: courseid,
                student_id: id
            })
        });
        if (!dropCourse) {
            return res.status(404).json({
                message: 'Course not found.'
            })
        }
        await dropCourse.destroy();
        console.log('Course has been deleted.')
        res.status(200).json({message: 'Course has been dropped.'}).end();
    } catch (err) {
        next(err);
    }
}

//Access all registered course
const getAllRegisteredCourses = async (req, res, next) => {
    try {
        const course = await RegisteredCourse.findAll({
            attributes: [
              ['student_id', 'id'],
              ['course_id', 'courseid'],
            ],
          });
        if (!course) {
            return res.status(404).json({
                message: 'Course does not exist.'
            })
        }
        res.status(200).json(course);
    } catch (err) {
        console.error('Access course error: ', err);
        res.status(500).json({
            message: 'An error occured.'
        });
    }
}


//Update specific registered course
const studentExchangesCourse = async (req, res, next) => {
    const {
        student_id,
        existingCourse,
        courseToExchange
    } = req.body

    try {
        const existingcourse = await RegisteredCourse.findOne({
            where: Sequelize.or({
                course_id: existingCourse,
                student_id: student_id
            })
        });
        if (existingcourse) {
            existingcourse.destroy();
            console.log('Course has been deleted.')
        }
        const rCourse = await RegisteredCourse.create({
            course_id: courseToExchange,
            student_id: student_id,
            created_at: today.toISOString(),
            updated_at: today.toISOString()
        });
        res.status(201).json(rCourse)
    } catch (err) {
        console.error('Exchange course failed: ', err);
        res.status(500).json({
            message: 'An error occured.'
        });
    }
}

module.exports = {
    studentRegister_ForACourse,
    studentDropsACourse,
    getAllRegisteredCourses,
    studentExchangesCourse
}