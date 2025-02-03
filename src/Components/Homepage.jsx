import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import '../Styles/homepage.css';

const BlogPost = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { text: comment, date: new Date() }]);
      setComment('');
    }
  };

  return (
    <div className="blog-post">
      <div className="blog-image-container">
        <img src={post.image} alt={post.title} className="blog-image" />
      </div>
      <div className="blog-content">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
      <div className="blog-actions">
        <button 
          className="action-btn like-btn"
          onClick={() => setLikes(prev => prev + 1)}
        >
          ❤️ {likes}
        </button>
        <button 
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💭 Comments ({comments.length})
        </button>
      </div>
      
      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>
          
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>{comment.text}</p>
                <span className="comment-date">
                  {comment.date.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const samplePosts = [
    {
      id: 1,
      title: "The Art of Web Development",
      content: "Exploring modern web development practices and techniques. Learn about the latest trends in web development and how to implement them in your projects.",
      image: "https://cdn.pixabay.com/photo/2020/11/18/10/40/laptop-5754927_1280.jpg"
    },
    {
      id: 2,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2015/05/11/14/44/pencils-762555_1280.jpg"
    },
    {
      id: 3,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2014/05/05/22/17/macbook-pro-338619_1280.jpg"
    },
    {
      id: 4,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2017/04/19/12/45/adult-2242164_960_720.jpg"
    },
    {
      id: 5,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2015/09/04/23/28/wordpress-923188_1280.jpg"
    },
    {
      id: 6,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2020/03/06/08/00/laptop-4906312_1280.jpg"
    },
    {
      id: 7,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2014/12/27/15/40/office-581131_1280.jpg"
    },
    {
      id: 8,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2019/10/23/14/07/hand-4571730_960_720.jpg"
    },
    {
      id: 9,
      title: "Understanding React Basics",
      content: "A comprehensive guide to getting started with React. Discover the fundamental concepts and best practices in React development.",
      image: "https://cdn.pixabay.com/photo/2018/06/13/09/32/technology-3472295_960_720.jpg"
    },

  ];

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-left">
          <Link to="/" className="nav-logo">AD Blogs</Link>
        </div>
        <div className="nav-right">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link signup">Sign Up</Link>
        </div>
      </nav>
      
      <div className="blogs-grid">
        {samplePosts.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

BlogPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default HomePage;