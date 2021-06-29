import { object, string } from "yup";

export const createUserSessionSchema = object({
    body: object({
        email: string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: string()
        .required('Password is required')
        .min(8, 'Password is too short, it should be 8 characters minimum')
        .matches(/^[a-zA-Z0-9_.-]*$/, 'Passord must contain only latin letters')
    })
});