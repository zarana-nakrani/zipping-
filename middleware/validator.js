 const {check,validationResult} = require('express-validator');

 exports.signupValidator = [
    check('name')
        .not().isEmpty()
        .trim()
        .withMessage('All fields required'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    check ('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
]

exports.signinValidator = [
    
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    check ('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
]

exports.validatorResult = (req,res,next)=>{
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if(hasErrors){
        console.log('hasErrors:' , hasErrors);
        console.log('result:',result);
    }

    next();
}
