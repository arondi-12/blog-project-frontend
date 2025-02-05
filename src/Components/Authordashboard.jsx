import { useEffect, useState } from 'react';
import '../Styles/authordashboard.css';

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
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/all-blogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log(blogs);
      
      if (response.ok) {
        setBlogs(data);
      } else {
        console.error('Blog fetch unsuccessful:', data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('An error occurred while fetching blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleNewBlog = async (blogData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([newBlog, ...blogs]);
        setShowNewBlogForm(false);
        alert('Blog posted successfully!');
      } else {
        alert('Failed to post blog.');
      }
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleUpdateBlog = async (blogData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${editingBlog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setBlogs(blogs.map(blog => blog.id === editingBlog.id ? { ...blog, ...blogData } : blog));
        setEditingBlog(null);
        alert('Blog updated successfully!');
      } else {
        alert('Failed to update blog.');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${blogId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        alert('Blog deleted successfully!');
      } else {
        alert('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="author-dashboard">
      <header className="dashboard-header">
        <h1>AUTHOR DASHBOARD</h1>
        <button className="new-blog-btn" onClick={() => setShowNewBlogForm(true)}>
          Create New Blog
        </button>
      </header>

      <div className="dashboard-content">
        {showNewBlogForm && (
          <div className="form-section">
            <h2>Create New Blog</h2>
            <BlogForm onSubmit={handleNewBlog} onCancel={() => setShowNewBlogForm(false)} />
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
          {/* {Array.isArray(blogs) && blogs.length > 0 ? ( */}
              {blogs.map(blog => (
                <div key={blog.id} className="blog-item">
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                </div>
              ))}
            {/* ) : (
              <p>No blogs found.</p>
            )} */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
