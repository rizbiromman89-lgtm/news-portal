import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function NewsPage() {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    api.get('/news/all').then((res) => setAllNews(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All News Publications</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {allNews.map((item) => (
          <div key={item._id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">{item.category}</span>
              <h3 className="font-bold text-lg my-2 line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.content}</p>
              <Link to={`/news/${item._id}`} className="text-blue-600 font-semibold text-sm hover:underline">
                Read Full Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}