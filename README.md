# Job Search App

## Description

The **Job Search App** is a platform that allows users to search for jobs relevant to their domain or area of interest. Users can create accounts, apply for jobs, and manage their job applications, while companies can post job listings and review applications.

## Features

- 🔍 **Job Filtering** - Search for jobs based on criteria such as location, working time, and seniority level.
- 🏢 **Company Management** - Companies can register, post jobs, and review applicants.
- 👤 **User Management** - Users can sign up, log in, and manage their profiles.
- 📄 **Job Applications** - Users can apply for jobs by uploading resumes.
- 🔒 **Authentication & Security** - Uses JWT for secure authentication.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Joi
- **File Uploads:** Multer & Cloudinary
- **Security:** Bcrypt for password hashing

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+)
- MongoDB (local or cloud instance)

### Clone the Repository

```sh
git clone https://github.com/yourusername/job-search-app.git
cd job-search-app
```

### Install Dependencies

```sh
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```
baseUrl=http://localhost:3000/
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Start the Server

```sh
npm start
```

The server will run on `http://localhost:9000/`

## API Endpoints

### **User APIs**

- `POST /api/users/signup` - Register a new user
- `POST /api/users/signin` - User login
- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/update` - Update user details
- `DELETE /api/users/delete` - Delete user account

### **Company APIs**

- `POST /api/companies` - Register a new company
- `PUT /api/companies/:id` - Update company details
- `DELETE /api/companies/:id` - Delete a company
- `GET /api/companies/:id` - Get company details with posted jobs

### **Job APIs**

- `POST /api/jobs` - Post a new job (Company HR only)
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get job details
- `DELETE /api/jobs/:id` - Delete a job (Company HR only)

### **Application APIs**

- `POST /api/applications` - Apply for a job (Upload Resume)
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update an application
- `DELETE /api/applications/:id` - Delete an application

## Security & Best Practices

- 🔐 **Password Encryption**: Uses bcrypt for storing hashed passwords.
- 🔒 **JWT Authentication**: Secure user sessions with JSON Web Tokens.
- 📜 **Input Validation**: Ensures data integrity using Joi.
- 🛡 **Error Handling**: Centralized error middleware for better debugging.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🚀 Happy Coding!** 🎉

