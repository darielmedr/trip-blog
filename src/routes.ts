import { Express, Request, Response } from 'express';
import { createUserHandler } from './controllers/user.controller';
import { createUserSession, getUserSessions, invalidateUserSession } from './controllers/session.controller';
import { createUserSchema } from './schema/user.schema';
import { createUserSessionSchema } from './schema/session.schema';
import { requiresUser, validateRequest } from './middlewares';
import { createPostHandler, deletePosts, getPostById, getPosts, updatePost } from './controllers/post.controller';
import { createPostSchema, deletePostSchema, updatePostSchema } from './schema/post.schema';

const routes = (app: Express) => {

    app.get('/api', (req: Request, res: Response) => {
        return res.sendStatus(200);
    });

    /**
     * Users auth
     */

    // Register user
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

    // Login
    app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSession);

    // Get user's sessions
    app.get('/api/sessions', requiresUser, getUserSessions)

    // Lougout
    app.delete('/api/sessions', requiresUser, invalidateUserSession);


    /**
     * Blog posts
     */

    app.get('/api/posts', requiresUser, getPosts);

    app.get('/api/posts/:id', requiresUser, getPostById);

    app.post('/api/posts', [requiresUser, validateRequest(createPostSchema)], createPostHandler);

    app.put('/api/posts/:id', [requiresUser, validateRequest(updatePostSchema)], updatePost);

    app.delete('/api/posts/:id', [requiresUser, validateRequest(deletePostSchema)], deletePosts);
};

export default routes;