# EduHub
EduHub is an e-learning platform designed to provide users with a seamless online education experience. It is built using Angular for the front end and Spring Boot for the back end.

![EduHub Website Preview](https://github.com/vaibhavpandey-hash/EduHub/blob/525bf3eec9620e8cd4dc829ea6ef80b3e3e17552/wedsitePreview.jpg)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Course Management**: Add, update, and delete courses.
- **User Dashboard**: Personalized dashboard for users to track their courses.
- **Responsive Design**: Fully responsive design to support various devices.

## Technologies Used

### Front End

- **Angular**: A platform for building mobile and desktop web applications.
- **Bootstrap**: CSS framework for responsive design.

### Back End

- **Spring Boot**: Framework for building Java-based enterprise applications.
- **Spring Security**: For authentication and authorization.
- **Hibernate**: For ORM (Object Relational Mapping).
- **MySQL**: Database for storing application data.

## Installation

### Prerequisites

- Node.js and npm installed
- Java Development Kit (JDK) installed
- MySQL installed

### Front End Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/SpringBoardMentor115/EduHub.git
    ```
2. Navigate to the project directory:
    ```bash
    cd eduhub-frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the Angular development server:
    ```bash
    ng serve
    ```

### Back End Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/SpringBoardMentor115/EduHub.git
    ```
2. Navigate to the project directory:
    ```bash
    cd eduhub-backend
    ```
3. Update the `application.properties` file with your MySQL database credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/eduhub
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    ```
4. Build and run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

## Usage

1. Open your browser and navigate to `http://localhost:4200` for the front end.
2. Access the backend API at `http://localhost:8080`.



