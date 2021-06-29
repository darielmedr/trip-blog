import { ref, object, string } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required('Name is required'),
        password: string()
            .required('Password is required')
            .min(8, 'Password is too short, it should be 8 characters minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Passord must contain only latin letters'),
        passwordConfirmation: string().oneOf(
            [ref('password'), null],
            'Passwords must match'
        ),
        email: string()
            .email('Must be a valid email')
            .required('Email is required')
    })
});
