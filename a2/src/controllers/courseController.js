const Course = require('../models/course');
const {
    Sequelize
} = require('sequelize');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.


//Access specific course (get)
const getCourse_byCourseCode = async (req, res, next) => {
    const {
        courseCode
    } = req.params
    console.log(courseCode)
    try {
        const course = await Course.findOne({
            where: Sequelize.or({
                courseCode: courseCode
            })
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

//Access all courses
const getAllCourses = async (req, res, next) => {
    try {
        const course = await Course.findAll();
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

//Creating course (POST)
const createCourse = async (req, res, next) => {
    const {
        courseCode,
        courseTitle,
        courseStartDate,
        courseEndDate,
        courseDays,
        courseStartTime,
        courseEndTime
    } = req.body;

    try {
        

        const course = await Course.create({
            courseCode,
            courseTitle,
            courseStartDate,
            courseEndDate,
            courseDays,
            courseStartTime,
            courseEndTime,
            created_at: today.toISOString(),
            updated_at: today.toISOString()
        });
        res.status(201).json(course);
    }catch (err) {
        next(err);
        console.log('error: ' + err.message);
      }
}

// Delete a course by ID
const deleteCourse = async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      await course.destroy();
      console.log('Course has been deleted.');
      res.status(200).json({message: 'Course has been deleted.'}).end();
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    getCourse_byCourseCode,
    getAllCourses,
    createCourse,
    deleteCourse
}