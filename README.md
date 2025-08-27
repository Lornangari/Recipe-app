
# Recipe App

The Recipe App allows users to discover new recipes, save their favorites, and share community recipes. It combines API-fetched recipes with community-contributed ones stored in Firestore, making it both resourceful and interactive.  


##  Features

-  Home page with categories and popular recipes
-  Search functionality for recipes by name or ingredient
-  Detailed recipe view with ingredients, instructions, and image
-  Save to Favorites using `firestore`
-  Responsive design for mobile and desktop
-  Fetching data from a public recipe API


##  Project Structure

recipe-app/
├── public/
│ └── index.html
├── src/
│ ├── components/ 
│ ├── pages/
│ │ 
│ ├── App.js
│ ├── index.js
│ └── App.css
├── package.json
└── README.md

##  Tech Stack

- Frontend: React, Tailwind CSS  
- Backend/Database: Firebase (Auth & Firestore)  
- API: External Recipe API 

## How to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Lornangari/Recipe-app.git
   cd recipe-app

