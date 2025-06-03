# EBA Healthcare Frontend

This is the frontend application for the Emergency Bed Allocation (EBA) Healthcare system. It provides a user interface for hospitals to manage their bed availability and for users to find available emergency beds.

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Setup

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd eba-frontend-js
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Features

- Hospital Registration and Login
- User Registration and Login
- Admin Dashboard
- Real-time Bed Availability Management
- Emergency Service Requests
- Responsive Design

## API Integration

The application integrates with the EBA Healthcare backend API hosted at:
```
https://eba.onrender.com
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  │   └── layout/    # Layout components (Navbar, Footer)
  ├── context/       # React Context providers
  ├── pages/         # Page components
  ├── services/      # API services
  └── App.jsx        # Main application component
```

## Technologies Used

- React 18
- Chakra UI
- React Router
- Axios
- Vite 