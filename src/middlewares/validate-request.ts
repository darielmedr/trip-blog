import { AnySchema } from 'yup';
import { NextFunction, Request, Response } from 'express';
import log from '../logger';

const validateRequest = (schema: AnySchema) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    schema.validate({
        body: req.body,
        query: req.query,
        params: req.params
    })
        .then(() => next())
        .catch((error) => {
            log.error(error);
            return res.status(400).send(error.errors);
        });
}

export default validateRequest;