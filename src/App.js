import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NewsArticle from './NewsArticle';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try{
        setLoading(true);

        const response = await axios.get('/api/news')

        setNews(response.data.articles);
        setLoading(false);
        
      } catch (err) {
        setError('Failed to fetch news articles');
        setLoading(false);
      }
  };

  fetchNews();
  }, []);

  return(
    <div className="App">
      <h1>Top News</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {news
          .filter(article => article.title && article.url)
          .map((article, index)=> (
            <li key={index}>
              <NewsArticle article={article} />
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;