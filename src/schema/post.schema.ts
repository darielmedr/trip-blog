import { object, string } from "yup";

const payload = {
    body: object({
        title: string().required('Title is required'),
        body: string().required('Body is required')
    })
};

const params = {
    params: object({
        id: string().required('Post ID is required')
    })
};

export const createPostSchema = object({
    ...payload
});

export const updatePostSchema = object({
    ...payload,
    ...params
});

export const deletePostSchema = object({
    ...params
});