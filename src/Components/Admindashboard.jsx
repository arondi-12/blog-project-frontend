import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/admindashboard.css';

const CommentItem = (comment, onAuthorize, onReject) => {
  return (
    <div className="comment-item">
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-date">{new Date(comment.timestamp).toLocaleDateString()}</span>
        </div>
        <p className="comment-text">{comment.text}</p>
        <div className="comment-post-info">
          On Post: {comment.postTitle}
        </div>
      </div>
      <div className="comment-actions">
        <button 
          className="authorize-btn"
          onClick={() => onAuthorize(comment.id)}
        >
          Authorize
        </button>
        <button 
          className="reject-btn"
          onClick={() => onReject(comment.id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = () => {

  const [pendingComments, setPendingComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      text: 'Great article! Very informative.',
      timestamp: new Date(),
      postTitle: 'Blog Post 1'
    },
    {
      id: 2,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 3,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 4,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 5,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 6,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 7,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 8,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    },
    {
      id: 9,
      author: 'Jane Smith',
      text: 'I found this very helpful.',
      timestamp: new Date(),
      postTitle: 'Blog Post 2'
    }
  ]);

  const handleAuthorize = (commentId) => {
    setPendingComments(prevComments => 
      prevComments.filter(comment => comment.id !== commentId)
    );
    alert('Comment authorized successfully!');
  };

  const handleReject = (commentId) => {
    setPendingComments(prevComments => 
      prevComments.filter(comment => comment.id !== commentId)
    );
    alert('Comment rejected!');
  };

  return (
      <div className="home-container">
      <nav className="home-nav">
        <div className="nav-left">
        </div>
        <div className="nav-right">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link signup">Dashboard</Link>
        </div>
      </nav>

      <div className="comments-section">
        <h2>Pending Comments</h2>
        {pendingComments.length === 0 ? (
          <p className="no-comments">No pending comments to review</p>
        ) : (
          <div className="comments-list">
            {pendingComments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment} 
                onAuthorize={handleAuthorize}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;