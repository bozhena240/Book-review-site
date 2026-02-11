# Dark Academia Book Archive

A sophisticated, persistent web application for scholars to track their library and share analysis. 

## Tech Stack
- **Frontend:** React (Vite)
- **Backend/Database:** Firebase Firestore (Real-time sync)
- **Authentication:** Firebase Auth
- **API:** Google Books API
- **Design:** Dark Academia Aesthetic (Custom CSS)

## Key Features
- **Real-time Scholarly Discussions:** Reviews are synced instantly across users via Firestore.
- **Personal Archives:** Users can favorite volumes to their private collection.
- **Protocol Safety:** Implements secure image protocol (HTTPS) forced via Regex/Replace.
- **Responsive Layout:** Engineered for readability across all screen sizes.

## How to Run Locally
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with your Firebase credentials.
4. Run `npm run dev`.

**Live Site:** [https://book-review-site-b6fde.web.app](https://book-review-site-b6fde.web.app)