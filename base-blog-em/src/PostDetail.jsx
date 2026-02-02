import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import './PostDetail.css';

export function PostDetail({ post, deleteMutation, updateMutation }) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['comments', post.id],
        queryFn: () => fetchComments(post.id),
        staleTime: 2000,
    });

    if (isLoading) return <h3>Loading...</h3>;
    if (isError) return <h3>Failed to load comments</h3>;
    return (
        <>
            <h3 style={{ color: 'blue' }}>{post.title}</h3>
            <div>
                <button onClick={() => deleteMutation.mutate(post.id)}>
                    Delete
                </button>{' '}
                {deleteMutation.isPending && (
                    <p className='loading'>Deleting the post</p>
                )}
                {deleteMutation.isError && (
                    <p className='error'>Error deleting the post: {}</p>
                )}
                {deleteMutation.isSuccess && (
                    <p className='success'>Post was (not) deleted</p>
                )}
            </div>
            <div>
                <button onClick={() => updateMutation.mutate(post.id)}>
                    Update title
                </button>
                {updateMutation.isPending && (
                    <p className='loading'>Updating post</p>
                )}
                {updateMutation.isError && (
                    <p className='error'>An error occured</p>
                )}
                {updateMutation.isSuccess && (
                    <p className='success'>Post was (not) updated</p>
                )}
            </div>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
