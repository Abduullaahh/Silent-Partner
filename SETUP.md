# Silent Partner - Setup Instructions

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **pnpm**
3. **Neon Database** account
4. **OpenAI API** key

## Environment Setup

1. Copy the `.env.local` file and update with your actual values:

```bash
# Database
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Setup

1. **Create a Neon Database:**
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string to `DATABASE_URL`

2. **Run Database Migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

## Installation

1. **Install Dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:3000`

## Features Implemented

### ✅ Backend Infrastructure
- **Database**: Neon PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **API Routes**: RESTful API for CRUD operations
- **Validation**: Zod schemas for data validation

### ✅ Core Functionality
- **User Authentication**: Sign up, login, session management
- **Update Management**: Create, read, update, delete investor updates
- **AI Integration**: OpenAI GPT-3.5-turbo for summary generation
- **PDF Generation**: Professional PDF export using jsPDF
- **Form Validation**: Client and server-side validation

### ✅ Frontend Integration
- **React Hook Form**: Form state management with validation
- **Real-time Updates**: Live form data binding
- **Error Handling**: Comprehensive error states
- **Loading States**: User feedback during async operations

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login (via NextAuth)

### Updates
- `GET /api/updates` - Get all user updates
- `POST /api/updates` - Create new update
- `GET /api/updates/[id]` - Get specific update
- `PUT /api/updates/[id]` - Update specific update
- `DELETE /api/updates/[id]` - Delete specific update
- `POST /api/updates/[id]/generate-summary` - Generate AI summary
- `GET /api/updates/[id]/pdf` - Download PDF

## Database Schema

### Users Table
- `id` (String, Primary Key)
- `name` (String, Optional)
- `email` (String, Unique)
- `emailVerified` (DateTime, Optional)
- `image` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Updates Table
- `id` (String, Primary Key)
- `title` (String)
- `status` (Enum: DRAFT, SENT, ARCHIVED)
- `revenue` (String, Optional)
- `burnRate` (String, Optional)
- `runway` (String, Optional)
- `growth` (String, Optional)
- `highlights` (String, Optional)
- `challenges` (String, Optional)
- `asks` (String, Optional)
- `aiSummary` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- `userId` (String, Foreign Key)

## Development Notes

### Authentication
- Currently using credentials provider for simplicity
- In production, consider adding OAuth providers (Google, GitHub)
- Password hashing is set up but not fully implemented

### AI Integration
- Uses OpenAI GPT-3.5-turbo for cost efficiency
- Can be upgraded to GPT-4 for better quality
- Includes error handling and fallback content

### PDF Generation
- Uses jsPDF for client-side PDF generation
- Professional formatting with KPI cards
- Responsive design for different screen sizes

## Next Steps

1. **Production Deployment**
   - Set up production database
   - Configure environment variables
   - Deploy to Vercel/Netlify

2. **Enhanced Features**
   - Email sending functionality
   - User profile management
   - Update templates
   - Analytics dashboard

3. **Security Improvements**
   - Rate limiting
   - Input sanitization
   - CSRF protection
   - Password strength requirements

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check `DATABASE_URL` in `.env.local`
   - Ensure Neon database is active
   - Run `npx prisma migrate dev` to sync schema

2. **OpenAI API Error**
   - Verify `OPENAI_API_KEY` is correct
   - Check API key has sufficient credits
   - Ensure API key has proper permissions

3. **Authentication Issues**
   - Check `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches your domain
   - Clear browser cookies and try again

4. **Build Errors**
   - Run `npm run build` to check for TypeScript errors
   - Ensure all environment variables are set
   - Check for missing dependencies

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all environment variables are properly configured
4. Verify database and API connections are working
