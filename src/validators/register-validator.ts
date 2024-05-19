import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        errorMessage: "email is required",
        notEmpty: true,

        isEmail: {
            errorMessage: "email address is not valid",
        },
    },
});

// export default [ body("email").notEmpty().withMessage("email is required") ]
