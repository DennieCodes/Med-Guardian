# PROJECT: Med Guardian

![](docs/images/Med%20Guardian%20logo.png)

Empowering Health: Seamless Medication Management, Tracking, and Scheduling for Your Well-Being

The project is a full stack FastAPI, PostgreSQL and React application that is built to run on Docker.

## Table of Contents:

**[Team](#team)**<br>
**[Tech Stack](#tech-stack)**<br>
**[Project Overview](#project-overview)**<br>
**[Design Color Palette](#design-color-palette)**<br>
**[Project Planning and Organization](#project-planning-and-organization)**<br>
**[Screenshots](#screenshots)**<br>
**[Backend API Endpointse](#backend-api-endpoints)**<br>
**[Steps to Run the Project](#steps-to-run-the-project)**<br>

## Team:

- Onkur Lal <a href="https://linkedin.com/in/onkur-lal" target="blank"><img height="20" align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="onkur-lal" /></a> <a href="https://github.com/OnkurLal" target="blank"><img height="20" align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="onkur-lal" /></a>

- Michael Zinzun <a href="https://www.linkedin.com/in/michaelzinzun/" target="blank"><img height="20" align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="michael-zinzun" /></a> <a href="https://github.com/mzinzun" target="blank"><img height="20" align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="michael-zinzun" /></a>

- Dennie Chan <a href="https://www.linkedin.com/in/dennie-chan/" target="blank"><img height="20" align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="dennie-chan" /></a> <a href="https://github.com/DennieCodes" target="blank"><img height="20" align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="dennie-chan" /></a>

## Tech Stack

- FastApi
- PostgreSQL
- Docker
- React
- Redux
- Bootstrap

## Project Overview

<ins>Problem Statement</ins>: Many individuals face challenges in effectively managing, tracking, and scheduling their medication regimens, leading to potential health risks, missed doses, and overall suboptimal health outcomes. The complexity of medication schedules, diverse prescriptions, and the lack of user-friendly tools contribute to the struggle individuals experience in adhering to their prescribed medication plans. Additionally, the absence of a centralized platform for medication management poses a barrier to efficient communication between patients, healthcare providers, and caregivers.

<ins>Goals and Objectives</ins>: Our goal is to address these issues by developing a comprehensive medication management application that simplifies the process of managing, tracking, and scheduling medications. This application aims to provide users with an intuitive and accessible tool to enhance medication adherence, and improve health outcomes.

<ins>User Personas</ins>: We created several user personae to help visualize our users and the challenges and frustrations they might currently face managing their medication routines:

- Barbara, 56 years old, is a teacher who has several health issues and is taking 5 different medications and has trouble remembering to take them. She also forgets to refill her medications which has caused lapses in her health regiment as she waits to get them refilled.

- George, 28, is a busy working professional who is on cholesterol and diabetes medication and often forgets to take his medication and would like something to help remind him.

<ins>Development</ins>: The planning and development of Med Guardian was driven by Domain Driven Design. The types of data and information needed for the application was determined through an iterative process of brainstorming, diagramming and discussion which resulted in the following data models and relationships:

![](docs/images/API-Design-web.png)

<ins>Design</ins>: The design and layout of the project was created through numerous sessions of design collaboration and discussions of user flow. Necessary elements, user interactions, theme, tone, colors, fonts and layouts were outlined iteratively from wireframes, rough drafts, higher fidelity mock-ups to completed designs.

## Design Color Palette

- Button Colors, Title Bar, (#164863)
- Button Color, Complimentary/Contrast (#e69937)
- Borders for forms and tables (#427D9D)
- Active item (#9BBEC8)
- Alternate background for table (#DDF2FD)
- Background color (#FFFBF5)

![](docs/images/Palette.png)

## Project Planning and Organization

To start our project we created a figma page to put down our ideas and thought process. It shows our thought process of how we designed and developed MedGuardian.

- Our figma drawing board can be found [here](https://www.figma.com/file/A9pFlC4pgr8QC4ZTZWG6Zk/Medical?type=whiteboard&node-id=0%3A1&t=DroqqcAyiWyinWWu-1)

For our project we utilized an issue and ticket system within the repo to help plan, organize and coordinate our efforts to develop the application. We utilized the following strategy to optimize and guide our efforts:

1. We began our day discussing our plans, any blockers we faced in the previous day and then assigned ourselves to tickets.
2. Each time member worked on feature branches associated with their tickets.
3. Whenever a team member was completed with their ticket they would request a peer review of their work.
4. After tickets were reviewed then that team member would submit their work for a merge request.
5. Each merge request was reviewed by a fellow team member and absent any issues or conflict with tests or linted would be submitted.
6. Most feature branches would be deleted upon merge or kept if further development was warranted.

Note: Some tickets were particularly complicated and would have several team members working on them.

[Link to issues, Project Tracking and Development Board](https://gitlab.com/Onkurlal/module3-project-gamma/-/boards)

## Screenshots

### Home Page

![](docs/images/Home-Page.jpg)

### Register Page

![](docs/images/Register.jpg)

### Login Page

![](docs/images/Login.jpg)

### Health Profile

![](docs/images/Health-Profile.jpg)

### Doctors

![](docs/images/Doctors.jpg)

### Pharmacies

![](docs/images/Pharmacies.jpg)

### Medications

![](docs/images/Medications.jpg)

### Calendar and Schedules

![](docs/images/Calendar-01.jpg)

## Backend API Endpoints

Here are diagrams of the API endpoints serving our project:

**Medications API**
![](docs/images/Medications-endpoints-web.png)

**Pharmacy API**
![](docs/images/Pharmacy-endpoints-web.png)

**Doctors API**
![](docs/images/Doctors-endpoints-web.png)

**User Account API**
![](docs/images/user-account-endpoints-web.png)

**User Profile API**
![](docs/images/user-profile-endpoints-web.png)

## Steps to Run the Project

1. Clone this repo
   - `git clone https://gitlab.com/Onkurlal/module3-project-gamma`
2. Navigate to project-beta
   - `cd module3-project-gamma`
3. Change the dockerfile in the docker-compose(line 15) to Dockerfile.dev
4. Make sure [Docker](https://www.docker.com/get-started/) is installed on your machine
5. Create the volume for the databse and pgAdmin
   - `docker volume create postgres-data`
   - `docker volume create pg-admin`
6. Create a .env file to the root and add the following environment variables and values:
   - PGADMIN_EMAIL
   - PGADMIN_PASSWORD
   - POSTGRES_PASSWORD
   - POSTGRES_USER
   - REACT_APP_API_HOST=http://localhost:8000
   - SIGNING_KEY
7. Build docker images
   - `docker-compose build`
8. Build docker containers from images
   - `docker-compose up`
9. Register the database on pgAdmin by accessing it at `http://localhost:8082`
10. Access the frontend React app on `http://localhost:3000`
