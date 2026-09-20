import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function Home() {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    api.get('/news/top').then((res) => setTopNews(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-12">
      {/* Section 1: Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Latest & Breaking Global News</h1>
        <p className="text-lg text-blue-200">Stay updated with trusted reporting and in-depth analyses.</p>
      </section>

      {/* Section 2: Top 6 News Items */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-600 inline-block pb-1">
          Top Headlines
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topNews.map((item) => (
            <div key={item._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h3 className="font-bold text-lg my-2 line-clamp-2">{item.title}</h3>
                <Link to={`/news/${item._id}`} className="text-blue-600 font-semibold text-sm hover:underline">
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore Categories</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {['Technology', 'Politics', 'Business', 'Sports', 'Entertainment'].map((cat) => (
              <span key={cat} className="bg-white px-4 py-2 rounded shadow-sm font-medium text-gray-700">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Newsletter */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Subscribe to Newsletters</h2>
        <p className="text-gray-600 mb-4">Get daily curated news updates right in your inbox.</p>
        <div className="flex justify-center gap-2">
          <input type="email" placeholder="Enter your email" className="border px-4 py-2 rounded w-64" />
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Subscribe</button>
        </div>
      </section>
    </div>
  );
}