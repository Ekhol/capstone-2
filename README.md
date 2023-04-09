# SupperClub
## A Resource for Hungry People at Home and Abroad

### Note: This App is designed for desktop browsers.

SupperClub is a resource for expats and those curious about food in order to provide a platform for cooks to share their experiences cooking outside of their home country.

This project uses the MealDB API in order to provide open-sourced recipes filtered by country of origin.

https://rapidapi.com/thecocktaildb/api/themealdb

Test User:

- Username: testuser
- Password: password

## Code:

Code is split between two applications:

### Backend:

- Uses Express to handle routing and data transfer to and from a SupperClub Postgres server.
- User authentication is handled here using both Bcrypt and Json Web Tokens.

### Frontend:

- Uses React to render HTML components, styled with Material UI.
- Frontend routing is handled using React Router DOM.
- Axios calls are made to the backend and to the external MealDB API.
- Logged in User tokens are held in Local Storage.

## User Flow:

Public view is accessible by all users without having logged in. From the homepage, anyone is able to view the list of supported countries sourced from the MealDB API and a NavBar with links to user posts, login, and registration. Any user is able to access all public user posts either from the "User Posts" tab or from the individual country of residency. 

### Country Landing Pages:

Country landing pages are accessible through the links on the homepage. They are intended to serve as a secondary pseudo-homepage that provides user posts from people who currently reside in said country as well as MealDB API-sourced recipes that originate from the country. User submitted recipes and posts may or may not be dishes originally from the country of residency, instead with the goal of highlighting challenges and successes of cooking outside of one's home country.

## Further Goals:

- Detailed MealDB Recipe pages.
- Following other users and pinned posts.
- Individual Profile pages.
- Stronger Mobile support.
- Stronger Styling.
- Rich Text Editing for user posts.

## Recent Changes:

- 4/9/2023 - Updated ReadMe, fixed navigation issues, added more testing for frontend.