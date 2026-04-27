# Pantry - let nothing go to waste
The goal of this app is to use all the food in your cupboards before it goes bad.  Less food wasted, more money saved.


## Current dev goals
1. Set up Compose and Dockerfiles to be ready to handle a layered environment (Dev, CI/CD, Production)
2. Build Cypress to test based on global text keys, building the foundation for multiple languages in the future.


## What tech, and why?
### Frontend
**React, TypeScript, Vite, React Router**

These are modern standards that are commonplace and well supported.

**Styled Components**

I like how clean it is to read.  I greatly like it versus any other styling option in React.

**TanStack Query**

I like that it handles data state directly within function context, and signals when similar data needs to refresh when next loaded elsewhere (cache invalidation).


### Backend
**Node.js, Express**

I wanted to expand on my Node skills, and Express is a standard.


### Data, Database
**Postgres**

Originally I was implementing MongoDB and Mongoose, to grow my experience working with NoSQL databases and tools.  After gaining a better understanding, I felt that the great benefits of it didn't apply to what I needed for my app.  I hadn't had the opportunity to work with Postgres before, and wanted to use this as an opportunity to do so.

For the data modeling, I separated users from direct item ownership to allow for shared households between users.  The item data is built to live between both primary app lists simultaneously, allowing modes for an item being on one, both, or none, providing different functionality for each (none will be "Past Items").


### Auth
**JWT, Argon2id**

I considered going with Firebase but I have a couple of feature ideas that wouldn't line up well with it, such as how I handle anonymous users over time.  I plan on reviewing this later, but thought that it worked well for an interim.


### Testing
**Cypress**

Initially I was using Vitest/RTL, but decided to go with Cypress to better cover e2e and CI.  And honestly?  Because this started as a study project and I rarely see Vitest on job postings, but I see Cypress on every other listing.  I also considered Playwright for the same reasoning.


### Infrastructure
**Docker, Compose**

I wanted to learn containerization and Docker is a popular tool.  From there I needed an easier way to spin containers up and down and have them communicate with each other, and naturally found Compose.


### CI/CD
**GitHub Actions**

This seemed like a natural fit for a project already being hosted in GitHub.


### Hosting
**DigitalOcean Droplet**

Chosen for cost and ethical reasons.
