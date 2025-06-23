# 🎵 Rehearsal Scheduler

A comprehensive web application designed to help music bands efficiently organize and manage their rehearsal sessions. This platform automates scheduling, sends reminders, tracks attendance, and suggests optimal rehearsal times based on member availability.

## 🚀 Features

- **User Account Management**: Create accounts, join bands, manage profiles
- **Band Profile Management**: Create and manage band profiles with member roles
- **Availability Management**: Set regular availability and exceptions
- **Rehearsal Scheduling**: Create events, find optimal times, schedule recurring sessions
- **Attendance Tracking**: RSVP to rehearsals, track confirmations
- **Notification System**: Receive reminders, get updates on changes
- **Rehearsal Content Management**: Attach setlists, suggest songs
- **Calendar Integration**: Sync with personal calendars, identify conflicts
- **Reporting & Analytics**: View attendance patterns, find optimal times
- **Mobile Responsive Design**: Access from any device

## 💻 Technology Stack

### Frontend
- React.js
- Redux for global state management
- Material-UI component library
- Formik with Yup for form validation
- Axios for API communication
- React-Big-Calendar for calendar views

### Backend
- Node.js runtime
- Express.js framework
- JWT authentication
- MongoDB database with Mongoose
- Redis for caching
- WebSockets for real-time updates

### DevOps
- Docker containerization
- GitHub Actions for CI/CD
- AWS hosting (EC2, S3, CloudFront)

## 🏗️ Architecture

The application follows a microservices architecture:

1. **Client Layer**: React SPA hosted on CDN
2. **API Gateway**: Entry point for requests, handles routing and security
3. **Microservices**:
   - User Service: Authentication, profiles, permissions
   - Band Service: Band profiles and member relationships
   - Scheduling Service: Core scheduling logic
   - Notification Service: Communications and reminders
   - Analytics Service: Usage data processing
4. **Data Layer**: MongoDB for storage, Redis for caching
5. **External Integrations**: Calendar APIs, email/SMS services

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Redis
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/music-rehearsal-scheduler-20250623.git
cd music-rehearsal-scheduler-20250623
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Create .env files in both backend and frontend directories
# See .env.example for required variables
```

4. Start the development servers:
```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend development server
cd ../frontend
npm start
```

### Docker Setup (Alternative)

1. Build and run using Docker Compose:
```bash
docker-compose up --build
```

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent brute force attacks
- Input validation and sanitization
- HTTPS enforcement
- CORS protection
- Regular security audits

## 📊 Future Enhancements

- Native mobile applications using React Native
- Advanced analytics and reporting
- Equipment management and tracking
- Integration with music streaming services
- Support for audio/video rehearsal recordings
- Virtual rehearsal rooms

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- DX AG Team

## 🙏 Acknowledgments

- All the open source libraries and tools used in this project
- The music community for inspiring this solution