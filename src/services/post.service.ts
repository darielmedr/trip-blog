import Post, { PostDocument } from '../models/post.model';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';


export async function createPost(
    input: DocumentDefinition<PostDocument>
): Promise<PostDocument> {

    return Post.create(input);
}

export async function findPostById(
    id: PostDocument['_id']
): Promise<PostDocument> {

    return Post.findById(id).lean();
}

export async function findPost(
    query: FilterQuery<PostDocument>
): Promise<PostDocument[]> {

    return Post.find(query).lean();
}

export async function findAndUpdatePost(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions
): Promise<PostDocument> {

    return Post.findOneAndUpdate(query, update, options).lean();
}

export async function deletePost(
    id: PostDocument['_id']
): Promise<PostDocument> {

    return Post.findByIdAndDelete(id).lean();
}