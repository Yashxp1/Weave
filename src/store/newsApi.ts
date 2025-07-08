import axios from 'axios';
import { error } from 'console';

export const fetchNews = async () => {
  try {
    const newsAPI = process.env.NEXT_PUBLIC_NEWS_API;
    if (!newsAPI) {
      throw new Error('NEWS API NOT FOUND');
    }
    const newsURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsAPI}`;
    
    const res = await axios.get(`${newsURL}`);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error('error fetching news', error.message);
    return null;
  }
};
