# Trainer Management System

## Overview
Trainer Management System is a web-based application built with React to efficiently manage trainers, their assigned classes, schedules, and performance tracking. It streamlines trainer allocation, session management, and reporting to enhance training operations.

## Features
- **Trainer Management**: Add, edit, and remove trainers with detailed profiles.
- **Class Scheduling**: Assign trainers to classes and manage their schedules.
- **Performance Tracking**: Monitor trainer performance and session completion.
- **Filtering & Sorting**: Advanced filters for trainers, classes, and modules.
- **Real-time Updates**: Fetch and update data dynamically with API integration.
- **Responsive UI**: Built with Ant Design for a modern and user-friendly interface.

## Technologies Used
- **Frontend**: React, React Router, Redux Toolkit, Redux Saga
- **UI Framework**: Ant Design, Styled Components
- **State Management**: Redux, React Hooks
- **Data Handling**: Axios for API requests
- **Date Management**: Native JavaScript Date API (Moment.js is not used)
- **Charting & Visualization**: Ant Design Charts

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (v18+ recommended)
- npm or yarn package manager

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/trainer-management-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd trainer-management-system
   ```
3. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
4. Start the development server:
   ```bash
   npm start  # or yarn start
   ```

## Usage
- Open `http://localhost:3000/` in your browser.
- Login as an administrator to manage trainers, classes, and schedules.
- Use filtering options to find trainers, sessions, and modules efficiently.
- Monitor trainer activity and generate reports.

## API Integration
This project interacts with a backend API for fetching and managing data. The API is secured using token-based authentication.

### Example API Request
```javascript
axios.get('https://your-api-url.com/api/trainers', {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

## Deployment
To build the project for production:
```bash
npm run build  # or yarn build
```
Serve the `build/` directory using a web server or deploy to platforms like Vercel, Netlify, or AWS.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes and push to the branch.
4. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For queries or support, please reach out to `your-email@example.com`.

