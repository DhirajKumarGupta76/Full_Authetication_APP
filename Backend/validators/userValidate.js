//is used to import the Yup library, which helps validate data in JavaScript applications, especially forms in React.
import * as yup from "yup"

//validation middleware
export const userSchema = yup.object({
    username: yup
        .string()
        .trim()
        .min(3, "username must be atleast of 3 characters")
        .required(),
    email: yup
        .string()
        .email('The email is not valid')
        .required("Email is required"),
    password: yup
        .string()
        .min(4, "password must be atleast of 4 chracter")
        .required("Password is required")
})

export const validateUser = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body)
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })

    }
}