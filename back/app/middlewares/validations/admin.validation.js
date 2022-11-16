const { checkSchema } = require("express-validator");
const { 
  validationResult, 
  validateExistEmail, 
  validateAndSanitize 
} = require('../../helpers/validations');

// const validateString = field => {
//   return field
//     .exists()
//     .withMessage('MISSING')
//     .bail()
//     .not()
//     .isEmpty()
//     .withMessage('IS_EMPTY')
//     .trim()
//     .escape()
// }

exports.validate = (req, res, next, type = 'body') => {
  for(const param in req.body) {
    console.log(req.body[param]);

  }
  return next();
}


exports.registro = [
  // validateString(check('nombres')),
  // validateString(check('apellidos')),
  // validateString(check('email'))
  //   .bail()
  //   .isEmail()
  //   .withMessage('EMAIL_IS_NOT_VALID')
  //   .custom(val => validateExistEmail(val)),
  // validateString(check('password'))
  //   .bail()
  //   .isLength({
  //     min: 8
  //   })
  //   .withMessage('PASSWORD_TOO_SHORT_MIN_8'),
  // validateString(check('rol')),
  // (req, res, next) => validationResult(req, res, next)

  checkSchema({
    nombres: {
      ...validateAndSanitize(),
    },
    apellidos: {
      ...validateAndSanitize(),
    },
    email: {
      ...validateAndSanitize(),
      isEmail: { 
        errorMessage: 'EMAIL_IS_NOT_VALID',
        bail: true 
      },
      custom: {
        options: value => validateExistEmail(value)
      }
    },
    password: {
      ...validateAndSanitize(true),
      isLength: {
        min: 8,
        errorMessage: 'PASSWORD_TOO_SHORT_MIN_8'
      }
    },
    rol: {
      ...validateAndSanitize(),
    },
  }),
  (req, res, next) => validationResult(req, res, next),
];

exports.getById = [
  checkSchema({
    id: {
      ...validateAndSanitize(),
    }
  }),
  (req, res, next) => validationResult(req, res, next),
]

exports.login = [
  checkSchema({
    email: {
      ...validateAndSanitize(),
    },
    password: {
      ...validateAndSanitize(true),
    }
  }),
  (req, res, next) => validationResult(req, res, next),
]

exports.delete = [
  checkSchema({
    id: {
      ...validateAndSanitize(),
    }
  }),
  (req, res, next) => validationResult(req, res, next),
]