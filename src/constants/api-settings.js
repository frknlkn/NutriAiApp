import axios from 'axios';


const api = axios.create({
  baseURL: 'https://api-nutriai.azurewebsites.net/api',
});