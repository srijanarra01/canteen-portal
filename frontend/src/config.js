// Set REACT_APP_API_URL when deploying (e.g. https://your-api.onrender.com)
const backend_base_url =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

export default backend_base_url;
