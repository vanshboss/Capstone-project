
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Post, Comment as CommentType, User } from '../types';
import * as db from '../services/db';
import { useAuth } from '../hooks/useAuth';
import CommentView from '../components/CommentView';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import toast from 'react-hot-toast';

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPostData = () => {
    if (!postId) return;
    const postData = db.getPostById(postId);
    if (postData) {
      setPost(postData);
      const authorData = db.getUserById(postData.authorId);
      setAuthor(authorData || null);
      setComments(db.getCommentsByPostId(postId));
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser || !postId) return;
    
    db.addComment({
      content: newComment,
      authorId: currentUser.id,
      postId: postId,
    });
    
    setNewComment('');
    setComments(db.getCommentsByPostId(postId)); // Re-fetch comments
    toast.success('Comment added!');
  };

  const handleDeletePost = () => {
      if(post && window.confirm("Are you sure you want to delete this post?")){
          const success = db.deletePost(post.id);
          if (success) {
            toast.success("Post deleted.");
            navigate('/');
          } else {
            toast.error("Failed to delete post.");
          }
      }
  }

  const isAuthor = useMemo(() => currentUser && post && currentUser.id === post.authorId, [currentUser, post]);

  if (loading) {
    return <div className="text-center">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center text-red-500">Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>By {author ? author.username : 'Unknown'}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
        </div>

        {isAuthor && (
            <div className="flex space-x-2 mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <Link to={`/edit/${post.id}`}>
                    <Button variant="secondary">Edit Post</Button>
                </Link>
                <Button variant="danger" onClick={handleDeletePost}>Delete Post</Button>
            </div>
        )}
        
        <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <section className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => <CommentView key={comment.id} comment={comment} />)
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Be the first to comment!</p>
          )}
        </div>
        
        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Leave a comment</h3>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows={4}
              required
            />
            <Button type="submit" className="mt-4" disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </form>
        ) : (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400">Please log in to leave a comment.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PostPage;