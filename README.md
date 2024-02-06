# ModerAI

## Description

ModerAI is designed to transform the grading process for educators by integrating AI technology for analysing and providing feedback on student essays. This tool aims to save educators time, ensure consistency in grading, and support students' learning with personalized feedback.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To install the ModerAI, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies with `npm install`.
3. Set up your environment variables for MongoDB URI, OpenAI API Key, and JWT Secret in a `.env` file.
4. Run npm run develop to start the server and client concurrently.

## Usage

The app allows educators to upload student essays, which are then automatically analyzed by the integrated AI. Educators can review AI-generated feedback, edit comments, and add their own feedback.

## Features

- **AI-Assisted Feedback**: Generates initial feedback on essays based on customizable grading criteria.
- **Interactive Feedback Interface**: Enables educators to review, edit, and add to AI-generated feedback.
- **Assignment Upload**: Supports direct upload of student essays for analysis.
- **Secure Authentication**: Utilizes JWT for secure login and session management.

## Technologies

- React
- Node.js + Express.js
- MongoDB + Mongoose
- Apollo Server and Client (GraphQL)
- Material-UI
- OpenAI API

## Screenshot

![ModerAI Screenshot](./client/build/assets/Screenshot.png)

## Demo

https://moderai2.onrender.com/

## Contributing

Contributions to the ModerAI are welcome. Please follow the standard fork, clone, and pull request workflow. Don't forget to update tests as appropriate.

## License

This project is licensed under the [MIT license](LICENSE.txt).

## Contact

For any questions or contributions, please reach out to us at [your-email@example.com](mailto:your-email@example.com).

---
