import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        errorMessage: "email is required",
        notEmpty: true,
        trim: true,
        isEmail: {
            errorMessage: "email address is not valid",
        },
    },
    firstName: {
        errorMessage: "First Name is required",
        notEmpty: true,
        trim: true,
    },
    lastName: {
        errorMessage: "Last Name is required",
        notEmpty: true,
        trim: true,
    },
    password: {
        errorMessage: "password is required",
        notEmpty: true,
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: "Password should be at least 8 chars",
        },
    },
});

// export default [ body("email").notEmpty().withMessage("email is required") ]
