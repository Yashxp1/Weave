import { fetchNews } from '@/store/newsApi';
import React, { useEffect, useState } from 'react';

const News = () => {
  const [news, setNews] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews()
      .then((data) => {
        if (data?.articles) setNews(data.articles);
        else setError('No articles found.');
      })
      .catch((err) => setError('Failed to fetch news'));
  }, []);

  return (
    <div className="">
      <h1 className="px-1 py-2 text-xl font-bold">Latest News</h1>
      <div className="flex justify-center items-center">
        {error && <p className="text-red-500">{error}</p>}
        {!news ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="overflow-y-scroll h-[800px]">
            <ul className="">
              {news.map((article: any, idx: number) => (
                <li key={idx} className="mb-4 border px-3 py-2 rounded-lg">
                  <h2 className="font-semibold">{article.title}</h2>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Read more
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
