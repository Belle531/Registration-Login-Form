# How to Use Axios in React for AWS API Gateway

## 1. Install Axios

Run this command in your project directory:

```bash
npm install axios
```

## 2. Import Axios

At the top of your React file (e.g., `SpiceRack.jsx`):

```jsx
import axios from "axios";
```

## 3. Make a GET Request to API Gateway

Replace `YOUR_API_URL` with your actual API Gateway endpoint:

```jsx
const API_URL = "https://your-api-id.execute-api.region.amazonaws.com/prod/recipes";

const fetchRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    setResults(response.data); // assuming your API returns an array of recipes
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};
```

## 4. Call `fetchRecipes` in a `useEffect` or on Search

Example for initial load:

```jsx
React.useEffect(() => {
  fetchRecipes();
}, []);
```

Or call it in your search handler if your API supports search queries:

```jsx
const handleSearch = async () => {
  try {
    const response = await axios.get(`${API_URL}?q=${searchTerm}`);
    setResults(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

## 5. Handle CORS

Make sure your API Gateway endpoint has CORS enabled so your React app can access it from the browser.

## 6. Error Handling

Always use try/catch to handle errors gracefully and inform the user if something goes wrong.

## 7. Example Integration in SpiceRack.jsx

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-api-id.execute-api.region.amazonaws.com/prod/recipes";

const SpiceRack = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(API_URL);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // ...rest of your component
};
```

---

**Tip:** You can use `axios.post`, `axios.put`, etc., for other HTTP methods as needed.

For more details, see the [Axios documentation](https://axios-http.com/docs/intro).
