const ContactForm = require('../models/contactForm');
const {
    Sequelize
} = require('sequelize');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

//Create questions
const studentHasAQuestion = async(req, res, next) => {
    const {
    student_id,
    student_name,
    student_email,
    query,
    } = req.body

    try{
        const contact = await ContactForm.create({
            student_id,
            student_name,
            student_email,
            query,
            created_at: today.toISOString(),
            updated_at: today.toISOString()
        });
        res.status(201).json(contact);
    }catch (err) {
        next(err);
        console.log('error: ' + err.message);
    }
}

//Update question with a response and admin_id
const adminResponse = async(req,res,next) => {
    const{
        response,
        admin_id,
        id
    } = req.body

    try{
        const adminresponse = await ContactForm.findByPk(id);
        if(!adminresponse){
            res.status(404).json({message: 'No questions from student.'})
        }
        adminresponse.update({
            response: response,
            admin_id: admin_id
        });
        res.status(202).json({message: 'Successfully responded.'})
    }catch(err){
        console.error('Response failed: ', err);
        res.status(500).json({
            message: 'An error occured.'
        });
    }
}

//Access all questions
const getAllQuestions = async (req, res, next) => {
    try {
        const question = await ContactForm.findAll();
        if (!question) {
            return res.status(404).json({
                message: 'Query does not exist.'
            })
        }
        res.status(200).json(question);
    } catch (err) {
        console.error('Access questions error: ', err);
        res.status(500).json({
            message: 'An error occured.'
        });
    }
}


module.exports = {
    studentHasAQuestion,
    adminResponse,
    getAllQuestions
}