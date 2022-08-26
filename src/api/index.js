// axios interceptor 구현
import axios from 'axios';
import API_BASE_URL from '../config/index';

// axios 객체 생성
const apiInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  // request interceptor
  instance.interceptors.request.use(
    // 요청 보내기 전 처리 로직
    (config) => {
      const header = config.headers;
      header.authorization = 'header test massage';
      return config;
    },
    // 요청 오류가 있는 작업 수행
    (error) => Promise.reject(error),
  );

  // response interceptor
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log('에러에러', err);
    },
  );

  return instance;
};

export default apiInstance;
