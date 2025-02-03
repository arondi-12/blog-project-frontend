import { useState } from 'react';
import '../Styles/authordashboard.css'

const BlogForm = (onSubmit, initialData = null, onCancel) => {
  const [blogData, setBlogData] = useState(initialData || {
    title: '',
    content: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(blogData);
    if (!initialData) {
      setBlogData({ title: '', content: '', image: '' });
    }
  };
  

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog Title"
        value={blogData.title}
        onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Write your blog content..."
        value={blogData.content}
        onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
        required
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={blogData.image}
        onChange={(e) => setBlogData({ ...blogData, image: e.target.value })}
      />
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData ? 'Update Blog' : 'Post Blog'}
        </button>
        {onCancel && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const AuthorDashboard = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Sample Blog Post',
      content: 'This is a sample blog post content.',
      image: 'https://cdn.pixabay.com/photo/2020/02/11/19/56/laptop-4840790_1280.jpg',
      date: new Date().toISOString()
    },
    {
      id: 2,
      title: 'The Bottlers ',
      content: 'It is now becoming a habit of bottling as the gunners are at it again.',
      image: 'https://cdn.pixabay.com/photo/2016/05/24/07/01/champions-1411861_1280.jpg',
      date: new Date().toISOString()
    }
  ]);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleNewBlog = (blogData) => {
    const newBlog = {
      ...blogData,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setBlogs([newBlog, ...blogs]);
    setShowNewBlogForm(false);
    alert('Blog posted successfully!');
  };

  const handleUpdateBlog = (blogData) => {
    setBlogs(blogs.map(blog => 
      blog.id === editingBlog.id ? { ...blog, ...blogData } : blog
    ));
    setEditingBlog(null);
    alert('Blog updated successfully!');
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      alert('Blog deleted successfully!');
    }
  };

  return (
    <div className="author-dashboard">
      <header className="dashboard-header">
        <h1>AUTHOR DASHBOARD</h1>
        <button 
          className="new-blog-btn"
          onClick={() => setShowNewBlogForm(true)}
        >
          Create New Blog
        </button>
      </header>

      <div className="dashboard-content">
        {showNewBlogForm && (
          <div className="form-section">
            <h2>Create New Blog</h2>
            <BlogForm 
              onSubmit={handleNewBlog}
              onCancel={() => setShowNewBlogForm(false)}
            />
          </div>
        )}

        {editingBlog && (
          <div className="form-section">
            <h2>Edit Blog</h2>
            <BlogForm 
              initialData={editingBlog}
              onSubmit={handleUpdateBlog}
              onCancel={() => setEditingBlog(null)}
            />
          </div>
        )}

        <div className="blogs-section">
          <h2>Your Blogs</h2>
          <div className="blogs-list">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-item">
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="blog-image" />
                )}
                <div className="blog-details">
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  <span className="blog-date">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="blog-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => setEditingBlog(blog)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;