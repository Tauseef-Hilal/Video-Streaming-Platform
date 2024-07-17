# Video Streaming Platform

## Overview

Welcome to our Video Streaming Platform! Built from the ground up, our platform offers a seamless experience for users to stream and upload videos directly within a personalized environment. Whether you're a content creator looking to share your work or a viewer exploring new videos, our platform is designed to cater to your needs.

This project does not rely on external video sources like YouTube or Instagram, but rather builds an independent, self-contained system for video content management and delivery.

## Features

- **Video Streaming**: Enjoy smooth video playback without interruptions, directly on our platform.
- **Video Uploading**: Seamlessly upload your videos with detailed metadata like titles, descriptions, and thumbnails.
- **Time-limited Content**: Share content that is available for a specific duration, enhancing urgency and exclusivity.
- **Custom Recommendation System**: Discover personalized video recommendations based on your preferences and viewing history.
- **User Channels**: Each user can create their own channel to showcase their content and engage with their audience.
- **Interactive Comments**: Engage with creators and other viewers through comments on videos.
- **Responsive Design**: Experience our platform on any device, ensuring a consistent and user-friendly interface.
- **Categories**: Videos can be categorized to improve discoverability and organization.
- **User Authentication**: Secure user sign-up and login using JWT (JSON Web Tokens).
- **Video Statistics**: Track views, likes, comments, and other key metrics for each video.

> _Note: The project is under development and does not implment all the features yet_

## Technologies Used

These include technologies that are currently in use in the project or will be used in the future.

- **Frontend**:

  - **Next.js**: A React framework for server-side rendering and generating static websites.
  - **TypeScript**: For type-safe JavaScript development.
  - **Apollo Client**: For managing GraphQL queries and mutations.

- **Backend**:

  - **Next.js API Routes**: For handling server-side logic.
  - **GraphQL**: For querying and manipulating data.
  - **Apollo Server**: For setting up the GraphQL server.
  - **JWT**: For user authentication and authorization.
  - **Prisma**: An ORM (Object-Relational Mapping) for interacting with the PostgreSQL database.
  - **FFmpeg**: For video processing tasks like transcoding and thumbnail generation.

- **Database**:

  - **PostgreSQL**: A powerful, open-source relational database system.

- **Cloud Services**: (Not sure yet)
  - **AWS S3**: For storing video files.
  - **Cloudflare**: For fast content delivery via a CDN (Content Delivery Network).

## Contributing

We welcome contributions to enhance the functionality of this project.

### How to Contribute

1. **Fork the repository** and clone it locally.

```bash
git clone https://github.com/Tauseef-Hilal/Video-Streaming-Platform.git
cd Video-Streaming-Platform
```

2. **Create a new branch** for your feature or bug fix:

```bash
git checkout -b feature-branch
```

3. **Commit your changes** following the [commit message conventions](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
git commit -am 'feat: Add new feature'  # For new features
git commit -am 'fix: Correct issue'     # For bug fixes
```

4. **Push your branch** to your fork:

```bash
git push origin feature-branch
```

5. **Open a pull request** against the `main` branch of the original repository. Provide a clear description of your changes and link any relevant issues.

### Coding Standards and Guidelines

To ensure smooth collaboration, please :

- **Adhere to the coding standards** and conventions used throughout the project.
- **Write clear and concise code** with meaningful comments where necessary.
- **Test your changes** thoroughly before submitting a pull request.

### Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for all contributors. Please review and abide by its guidelines.

### Setup Instructions

Before contributing, ensure you have set up your development environment:

1. **Prerequisites**:

   - **Node.js**: Ensure you have Node.js installed locally.
   - **PostgreSQL**: Set up a PostgreSQL database and update the connection string in the `.env` file.

2. **Installation**:

```bash
npm install
```

3. **Environment Variables**:

Create a `.env` file in the root directory and add the necessary environment variables:

```plaintext
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your_jwt_secret"
```

4. **Database Migration**:

Apply the Prisma schema and migrate the database:

```bash
npx prisma migrate dev
```

5. **Start the Development Server**:

```bash
npm run dev
```

6. **Access the Application**:

Open your browser and navigate to `http://localhost:3000`.

### Feedback and Support

If you have any questions, issues, or suggestions, please [open an issue](https://github.com/your-username/video-streaming-platform/issues) on GitHub or contact us directly.

Thank you for contributing to this project and helping to make it better for everyone! For any questions or inquiries, please contact [Tauseef Tantary](tantary.tauseef.atwork@gmail.com).
