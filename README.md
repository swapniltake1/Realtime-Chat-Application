# Realtime Chat Application

## Introduction

Welcome to the Realtime Chat Application! This project is a full-fledged messaging application with a user interface inspired by WhatsApp. It enables users to exchange messages individually or within groups, view user statuses, and supports image uploading. The project utilizes React for the frontend with Tailwind CSS for styling, and the backend is powered by Spring Boot, ensuring secure login using Spring Security with JWT-based authentication. Cloudinary is employed for image uploading and storage, while Redux and Thunk are used for state management in the frontend.

## Features

- **Realtime Messaging:** Experience seamless, real-time messaging with instant message delivery.

- **User Status:** Stay connected with friends by viewing their online or offline status.

- **Group Creation:** Create groups for efficient group communication and collaboration.

- **Individual Messaging:** Send private messages to individuals for one-on-one communication.

- **Login and Signup:** Securely access the application with a login and signup system.

- **Image Uploading:** Share images easily by uploading and storing them with Cloudinary.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Spring Boot
- **Database:** MySQL
- **Authentication:** Spring Security, JWT
- **Image Upload:** Cloudinary
- **State Management:** Redux, Thunk
- **Other Tools and Tech** Telewind, mui, vscode, eclipse

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/realtime-chat-app.git
   ```

2. **Navigate to Frontend and Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Navigate to Backend and Install Dependencies:**
   ```bash
   cd backend
   mvn clean install
   ```

4. **Configure Environment Variables:**
   - Set up Cloudinary credentials.
   - Configure Spring Boot application.properties for database and other configurations.

5. **Run the Application:**
   - Start the frontend:
     ```bash
     npm start
     ```
   - Start the backend:
     ```bash
     mvn spring-boot:run
     ```

6. **Access the Application:**
   Open your browser and visit `http://localhost:3000` to use the Realtime Chat Application.

## Contribution Guidelines

We welcome contributions! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Thank you for using and contributing to the Realtime Chat Application!
