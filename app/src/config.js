const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.odessa.cleverapps.io"
    : "http://localhost:3615";

export { API_URL };
