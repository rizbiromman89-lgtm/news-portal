import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function NewsDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/news/${id}`).then((res) => setArticle(res.data)).catch(console.error);
  }, [id]);

  if (!article) return <div className="text-center py-12">Loading article...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
        {article.category}
      </span>
      <h1 className="text-4xl font-extrabold my-4">{article.title}</h1>
      <div className="flex justify-between text-gray-500 text-sm mb-6">
        <span>By {article.author?.name || 'Editorial Team'}</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
      <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{article.content}</p>
    </div>
  );
}