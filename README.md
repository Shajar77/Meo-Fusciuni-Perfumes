# Meo Fusciuni Perfumes

## Overview
Meo Fusciuni Perfumes is a premium e-commerce platform dedicated to the artistic fragrance collection of Meo Fusciuni. The application provides a seamless shopping experience, featuring a curated catalog, detailed product views, user authentication, and a robust administrative dashboard for inventory and order management.

## Key Features
- **Product Catalog**: Browse the complete collection of Meo Fusciuni fragrances.
- **Detailed Product Views**: Comprehensive information about each perfume, including scent profiles and notes.
- **User Authentication**: Secure login and registration powered by Firebase.
- **Shopping Cart and Checkout**: Integrated cart management and a streamlined checkout process.
- **Favorites**: Ability for users to save their preferred fragrances.
- **Order Management**: Users can view their order history and status.
- **Admin Dashboard**: Specialized interface for administrators to manage products, orders, and users.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.

## Technology Stack
- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Backend/Database**: Firebase (Authentication, Firestore)
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- Firebase account and project

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd Perfumes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   Ensure your Firebase configuration is correctly set up in `src/firebase.js`.

### Running the Application
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production
To create a production build:
```bash
npm run build
```

## Project Structure
- `src/components`: Reusable UI components.
- `src/pages`: Main application pages and route components.
- `src/context`: React Context providers for Auth and Cart management.
- `src/services`: Data fetching and external service integrations.
- `src/assets`: Static assets like images and global styles.

## License
This project is private and proprietary. All rights reserved.
