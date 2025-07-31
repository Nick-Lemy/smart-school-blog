# AI Summary Regeneration Feature

## Overview

Added a refresh button to regenerate AI summaries for posts using the new API endpoint `GET /posts/{id}/summary`.

## Features Implemented

### 🔄 **AI Summary Refresh Button**

- **Location**: Available in both blog listing page and individual post detail page
- **Icon**: Refresh/Rotate icon (RefreshCw from Lucide React)
- **Functionality**: Calls the API endpoint to generate a new AI summary
- **Loading State**: Shows spinner and "Generating..." text during API call

### 📍 **Where It Appears**

1. **Blog Listing Page** (`/home/blog`)

   - Small refresh button next to "AI SUMMARY" label
   - Updates the summary in the post card without page reload
   - Tracks loading state per individual post

2. **Post Detail Page** (`/home/blog/[postId]`)
   - Refresh button with text ("Refresh" or "Generate")
   - Shows even when no AI summary exists yet
   - Placeholder text when no summary available

### 🎨 **User Experience**

- **Visual Feedback**: Loading spinner during generation
- **Smart Labeling**:
  - "Generate" when no summary exists
  - "Refresh" when summary exists
  - "Generating..." during loading
- **Disabled State**: Button disabled during API call
- **Hover Effects**: Green color transitions
- **Tooltip**: Helpful title attribute

### 🔧 **Technical Implementation**

#### API Integration

```typescript
const response = await api.get(`/posts/${postId}/summary`);
// Returns: { "content": "AI-generated summary..." }
```

#### State Management

- `isRegeneratingAI`: Loading state for individual post
- `regeneratingPostId`: Tracks which post is being regenerated in listing
- Frontend-only updates (no backend persistence needed)

#### Type Safety

- Updated `Post` interface: `aiSummary: string | null`
- Proper TypeScript types for API response

### 📱 **Responsive Design**

- Works on all screen sizes
- Consistent styling with existing green theme
- Proper spacing and alignment

## Files Modified

1. **`/src/app/home/blog/[postId]/page.tsx`**

   - Added refresh button to AI summary section
   - Added state and function for regeneration
   - Always shows AI summary section with generate option

2. **`/src/app/home/blog/page.tsx`**

   - Added refresh button to post cards
   - Added per-post loading state tracking
   - Conditional rendering based on summary existence

3. **`/src/lib/types.ts`**
   - Updated `Post.aiSummary` type from `null` to `string | null`

## Usage

1. Navigate to any post (listing or detail view)
2. Look for the AI SUMMARY section
3. Click the refresh/generate button
4. Wait for the new summary to appear
5. Summary updates instantly in the frontend

The feature provides a seamless way for users to get fresh AI-generated summaries without page reloads or backend data persistence.
