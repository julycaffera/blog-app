# Assumptions

## Technical and Business Assumptions

1. **Database**: Using SQLite with Prisma ORM
2. **UI Framework**: TailwindCSS for styling and responsive design
3. **API Structure**: RESTful API endpoints using Next.js API routes
4. **Component Architecture**: Modular components with separation of concerns (hooks, components, pages)
   - Custom hooks for data fetching logic (usePosts, useUsers)
   - Reusable UI components (PostCard, UserFilter, PostsList, Navigation, Pagination, etc.)
   - Separation of concerns between data logic and UI components
5. **Data Seeding**: Seeding using Prisma upsert operations to prevent duplicates
6. **Pagination**: Server-side pagination with configurable page size (default: 12 posts per page)
7. **Data Source**: Using JSONPlaceholder API as external data source for seeding, but transforming and storing in custom Prisma models with relationships
8. **Post Management**: Users can view and delete posts, but not create or edit
9. **Filtering**: Users can filter posts by author (userId) with a dropdown selector
10. **Confirmation**: Delete operations require user confirmation via modal dialog

## Data Assumptions

1. **User Data**: Includes name, username, email, and related address/company info
2. **Post Data**: Includes title, body, and author relationship
3. **Relationships**: 
   - One-to-many relationship between users and posts
   - One-to-many relationship between companies and users
   - One-to-one relationship between users and addresses
   - One-to-one relationship between addresses and geo coordinates
4. **Data Integrity**: Foreign key constraints maintained in database
5. **Data Uniqueness**: Unique constraints on company names, geo coordinates, and address combinations