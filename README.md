# Online Shop

A demo online shop built with React. This project uses dummyjson.com APIs as a backend source. It includes actions related to products and users, demonstrating typical e-commerce functionalities.

## Technologies Used

- React (created with Vite)  
- SCSS / CSS Modules  
- Redux Toolkit  
- React Router DOM  
- React Hook Form  
- Immer  
- React Query  
- Axios  
- FontAwesome  

## Features

This demo online shop uses dummyjson.com APIs to simulate product and user actions. Key features include:

- Product Listing: View all products, filter by category, search, and sort.  
- Product Details: Individual product pages with detailed information.  
- User Interactions: Users can like products and add them to a cart.  
- Liked Products & Cart: Persisted locally using `redux-persist`.  
- User Roles:
  - User: View product info, like products, add to cart, and edit personal info.  
  - Moderator: All user actions + can add and update any product.  
  - Admin: All moderator actions + can delete products.  
- Responsive Design: Mobile-friendly and user-friendly UI.  
- Demo Limitations: Since this uses dummyjson.com, changes are not persisted on the server and are lost on page refresh or logout.

## Installation

To run the project locally, open the project folder in your code editor, install dependencies, and start the development server:

```bash
npm install
npm run dev
