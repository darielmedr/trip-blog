import { Request, Response } from "express";
import { get } from 'lodash';
import { createPost, deletePost, findAndUpdatePost, findPost, findPostById } from "../services/post.service";


export async function getPosts(req: Request, res: Response): Promise<Response> {

    try {
        const userId = get(req, 'user._id');

        const posts = await findPost({ userId });

        return res.status(200).json(posts);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getPostById(req: Request, res: Response): Promise<Response> {

    try {
        const postId = get(req, 'params.id');

        const posts = await findPostById(postId);

        return res.status(200).json(posts);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function createPostHandler(req: Request, res: Response): Promise<Response> {

    try {
        const userId = get(req, 'user._id');

        const post = req.body;

        const newPost = await createPost({ ...post, userId });

        return res.status(201).json(newPost);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function updatePost(req: Request, res: Response): Promise<Response> {

    try {
        const postId = get(req, 'params.id');

        const post = await findPostById(postId);

        if (!post) return res.sendStatus(404);                                              // 404 not found

        const userId = get(req, 'user._id');

        if (<string>post.userId !== <string>userId) return res.sendStatus(401);                             // 401 unauthorized

        const update = req.body;

        const updatedPost = await findAndUpdatePost({ _id: postId }, update, { new: true });

        return res.status(200).json(updatedPost);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function deletePosts(req: Request, res: Response): Promise<Response> {

    try {
        const postId = get(req, 'params.id');

        const post = await findPostById(postId);

        if (!post) return res.sendStatus(404);

        const userId = get(req, 'user._id');

        if (<string>post.userId !== <string>userId)
            return res.sendStatus(401);

        const deletedPost = deletePost(postId);

        return res.status(200).json(deletedPost);

    } catch (error) {
        return res.sendStatus(500);
    }
}