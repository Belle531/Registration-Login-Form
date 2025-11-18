# How Axios Works with APIs

Axios is a popular JavaScript library for making HTTP requests from the browser (or Node.js) to APIs. Here’s how it works and how you use it in a React app:

---

## 1. What is Axios?

Axios is a promise-based HTTP client. It lets you send requests (GET, POST, PUT, DELETE, etc.) to API endpoints and handle responses easily.

---

## 2. How Axios Communicates with APIs

- You specify the API endpoint URL (e.g., from AWS API Gateway).
- Axios sends an HTTP request to that URL.
- The API processes the request and sends back a response (usually JSON).
- Axios receives the response and you use the data in your app.

---

## 3. Example: Fetching Data from an API

```jsx
import axios from "axios";

const API_URL = "https://your-api-id.execute-api.region.amazonaws.com/prod/recipes";

const fetchRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    // response.data contains the API response
    setResults(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
```

---

## 4. Sending Data to an API

```jsx
const addRecipe = async (recipe) => {
  try {
    const response = await axios.post(API_URL, recipe);
    // response.data contains the result from the API
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
};
```

---

## 5. Handling API Responses

- Axios returns a promise.
- The response object contains:
  - `data`: The response body (usually JSON)
  - `status`: HTTP status code
  - `headers`: Response headers

---

## 6. Error Handling

Always use try/catch or `.catch()` to handle errors (network issues, bad responses, etc.).

---

## 7. Why Use Axios?

- Simple syntax for requests
- Automatic JSON parsing
- Handles errors and timeouts
- Supports interceptors for request/response logic

---

## 8. Integration with React

- Use Axios in `useEffect` for initial data load
- Use Axios in event handlers (e.g., search, add, update)
- Update your component state with API data

---

## 9. Summary

Axios makes it easy to connect your React app to any API (including AWS API Gateway). You send requests, receive data, and update your UI—all with simple code.

For more details, see the [Axios documentation](https://axios-http.com/docs/intro).
