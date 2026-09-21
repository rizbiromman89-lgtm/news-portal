import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { useAuthStore } from '../store/useAuthStore';

export default function Dashboard() {
  const { user, updateUser } = useAuthStore();
  const [userNews, setUserNews] = useState([]);
  const [profileData, setProfileData] = useState({ name: user?.name || '', bio: user?.bio || '' });

  useEffect(() => {
    api.get('/news/user').then((res) => setUserNews(res.data)).catch(console.error);
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', profileData);
      updateUser(res.data);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    try {
      await api.delete(`/news/${id}`);
      setUserNews(userNews.filter((item) => item._id !== id));
    } catch (err) {
      alert('Failed to delete news');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section className="bg-white p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">User Profile Settings</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full border p-2 rounded"
              rows="3"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update Profile
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Manage Published Articles</h2>
        <div className="space-y-4">
          {userNews.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-sm">
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <span className="text-xs text-gray-500">Published: {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}