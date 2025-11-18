# What Happens When You Search for a Recipe

## User Experience

- The user enters a recipe name (e.g., "Zuppa Toscana Soup") in the search bar and clicks the search icon.

## Application Flow

1. **Search Triggered**
   - The `handleSearch` function is called in your React app.

2. **API Request**
   - The app sends an HTTP GET request to your API endpoint (e.g., AWS API Gateway) with the search term as a query parameter.
   - Example: `https://your-api-id.execute-api.region.amazonaws.com/prod/recipes?q=Zuppa Toscana Soup`

3. **Backend Processing**
   - The backend (Lambda, EC2, etc.) receives the request.
   - It searches the database or data source for recipes matching the search term.
   - It returns a JSON array of matching recipes, each with details like name, description, and (optionally) image URL.

4. **Frontend Update**
   - The React app receives the response.
   - The `results` state is updated with the returned recipes.
   - The UI re-renders, showing only the matching recipe cards in the grid.
   - If the recipe includes an image URL, the card displays the image.

5. **Error Handling**
   - If the API fails or returns no results, the app shows an error message or "No recipes found."

## Example

- User searches for "Zuppa Toscana Soup"
- API returns:
json
  [
    {
      "id": 9,
      "name": "Zuppa Toscana Soup",
      "description": "A hearty Italian soup with sausage, kale, and potatoes.",
      "imageUrl": "https://example.com/images/zuppa-toscana.jpg"
    }
  ]

- The app displays a card for Zuppa Toscana Soup, including the image if provided.

## Summary

- The search bar connects the user to your recipe API.
- Results are dynamic and update instantly based on the search term.
- Images and details are shown if provided by the backend.
