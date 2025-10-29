# The MovieDB

A full-stack movie and TV show management web application with complete CRUD functionality.

**Frontend:** [https://thefilmdb.vercel.app/](https://thefilmdb.vercel.app/)  
**Backend API:** [https://movie-web-g1m4.onrender.com/](https://movie-web-g1m4.onrender.com/)

---

## Tech Stack

- React (Vite + TypeScript)
- TailwindCSS
- Shadcn/UI
- Node.js + Express
- MySQL with Prisma ORM
- Zod for input validation
- Hosted on Render (API) and Vercel (Frontend)

---

## API Endpoints

**Base URL:**  

```tsx
https://movie-web-g1m4.onrender.com/
```

### Movies

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST   | /movies | Create a new movie |
| PUT    | /movies/:id | Update an existing movie |
| DELETE | /movies/:id | Delete a movie |

### TV Shows

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST   | /tvshows | Create a new TV show |
| PUT    | /tvshows/:id | Update an existing TV show |
| DELETE | /tvshows/:id | Delete a TV show |

### Root

```tsx
GET /
```

---

## Sample Data

```json
{
  "id": 5,
  "title": "Avatar: The Way of Water",
  "imgUrl": "https://m.media-amazon.com/images/S/pv-target-images/f0535dd61f56bddd6ee7f3bfb765645e45d78f373418ae37ee5103cf6eebbff0.jpg",
  "releaseDate": "2022-12-16T00:00:00.000Z",
  "description": "Jake Sully and Neytiri must protect their family when a new threat emerges on Pandora.",
  "director": "James Cameron",
  "rating": 7.8,
  "userId": 1,
  "createdAt": "2025-10-29T05:30:39.680Z",
  "updatedAt": "2025-10-29T05:30:39.680Z"
}
```

## Features

- CRUD operations for Movies and TV Shows
- Prisma-based MySQL integration
- Type-safe validation with Zod
- Responsive UI built with TailwindCSS and Shadcn
- Deployed using Render and Vercel

## Screenshots

![Home](public/img0.png)

![Browse Page](public/image.png)

![Table Mode](public/img2.png)

![Add](public/img3.png)

## Host Your Own

If you want to host your own version of The MovieDB:

- Clone this repository

```bash
https://github.com/tmonga2208/movie-full.git
```

- Go to the backend directory

```bash
cd movie-backend
```

- Set your own database
- Open .env and update:

```bash
DATABASE_URL="mysql://user:password@host:port/database"
```

- Deploy on Render
- For DB Host a instance on Railway
- Push your backend code to a GitHub repo
- Create a new Web Service on Render and connect it to that repo
- Add your DATABASE_URL in Render’s environment variables

Optionally, you can also deploy the frontend to Vercel by importing the project and connecting it to your repository.
