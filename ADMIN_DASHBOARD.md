# Admin Dashboard Documentation

## Overview

The Admin Dashboard is a protected area accessible only to verified users with `isVerified: true` in their user profile. It provides comprehensive content management capabilities for moderating the SmartSchool platform.

## Access Control

- **Route Protection**: `/home/admin` is protected by `AdminProtectedRoute` component
- **User Verification**: Only users with `isVerified: true` can access
- **Automatic Redirect**: Non-verified users are redirected to `/home/dashboard`
- **Navigation**: Admin link appears in bottom navigation only for verified users

## Features

### 📊 **Statistics Overview**

- **Total Posts**: Real-time count of all posts in the system
- **Total Events**: Real-time count of all events in the system
- **Total Comments**: Real-time count of all comments in the system

### 📝 **Posts Management**

- **View All Posts**: Complete list of all posts with metadata
- **Post Details**: Title, content preview, author information
- **Engagement Metrics**: Likes count, comments count
- **Delete Posts**: Confirmation dialog before deletion
- **Navigation**: Click post title to view full post

### 📅 **Events Management**

- **View All Events**: Complete list of all events with details
- **Event Information**: Title, description, dates, location
- **Attendee Count**: Number of registered attendees
- **Delete Events**: Confirmation dialog before deletion
- **Navigation**: Click event title to view full event

### 💬 **Comments Management**

- **View All Comments**: Complete list of all comments across the platform
- **Comment Context**: Shows comment content and associated post ID
- **Author Information**: Avatar and name of comment author
- **Delete Comments**: Confirmation dialog before deletion
- **Timestamp**: When the comment was created

## Security Features

- **Confirmation Dialogs**: All deletions require confirmation
- **Loading States**: Visual feedback during operations
- **Error Handling**: Graceful error handling for failed operations
- **Route Protection**: Multiple layers of access control

## Technical Implementation

- **Protected Route Component**: `AdminProtectedRoute` wrapper
- **Alert Dialogs**: Radix UI alert dialogs for confirmations
- **API Integration**: Full CRUD operations via REST API
- **Real-time Updates**: State updates after successful operations
- **Responsive Design**: Works on all screen sizes

## User Experience

- **Tabbed Interface**: Organized content management sections
- **Search & Filter**: Easy navigation through large datasets
- **Consistent Styling**: Matches application theme
- **Loading Indicators**: Clear feedback for all operations
- **Hover Effects**: Interactive elements with visual feedback

## Navigation

- **Access via**: Bottom navigation "Admin" tab (verified users only)
- **Direct URL**: `/home/admin` (protected route)
- **Back Navigation**: Integrated with application navigation

## Data Displayed

All content is fetched in real-time from the API, ensuring administrators always see the most current state of the platform.
