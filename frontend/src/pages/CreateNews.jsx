import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function CreateNews() {
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General', image: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/news', formData);
      alert('News published successfully!');
      navigate('/news');
    } catch (err) {
      alert('Failed to publish news');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="Technology">Technology</option>
            <option value="Politics">Politics</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            required
            rows="6"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Publish
        </button>
      </form>
    </div>
  );
}