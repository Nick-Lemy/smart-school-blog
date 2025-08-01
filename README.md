# Smart School Blog

A modern, responsive blog platform's frontend built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive blogging and event management system for educational institutions.

## Features

- **Authentication System** - Secure login and registration
- **Blog Management** - Create, read, and delete blog posts
- **Event Management** - Organize and manage campus events
- **User Profiles** - Personal user profiles with posts and events
- **AI-Powered Summaries** - Automatic post summarization
- **Admin Dashboard** - Complete admin panel for content management
- **Responsive Design** - Mobile-first responsive interface

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your machine.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nick-Lemy/smart-school-blog.git
   cd smart-school-blog
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```bash
   # Backend API URL
   NEXT_PUBLIC_BASE_URL=https://smart-school-blog-backend.onrender.com
   ```

### Running the Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Using pnpm:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

Using npm:

```bash
npm run build
npm start
```

Using yarn:

```bash
yarn build
yarn start
```

## Project Structure

```text
src/
├── app/
│   ├── auth/              # Authentication pages
│   ├── home/              # Main application pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── blog/          # Blog pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── events/        # Event pages
│   │   └── profile/       # User profiles
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── ...               # Custom components
├── contexts/             # React contexts
├── lib/                  # Utility functions and types
└── ...
```

## Available Scripts

- `npm run dev` / `yarn dev` - Start development server
- `npm run build` / `yarn build` - Build for production
- `npm start` / `yarn start` - Start production server
- `npm run lint` / `yarn lint` - Run ESLint

## Key Features Walkthrough

### Authentication

- Login and registration with form validation
- Protected routes for authenticated users
- Admin-only routes for administrative functions

### Blog System

- Create and publish blog posts
- AI-powered post summaries with regeneration
- Like and comment functionality
- User interaction tracking

### Event Management

- Create and manage events
- Event categories and scheduling
- Attendee management
- Event discovery and filtering

### Admin Dashboard

- User management (view and delete users)
- Content moderation (posts and events)
- Responsive admin interface

### Responsive Design

- Mobile-first approach
