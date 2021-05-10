const apiConfig = {
  baseUrl:
    process.env.REACT_APP_ENV === 'dev'
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_PROD_URL,
};

export default apiConfig;
