🏡 VistaBnB – Airbnb Clone
VistaBnB is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, and EJS. This platform allows users to list properties, edit/delete their listings. It also features user authentication, session management, image uploads, and reviews.

🚀 Features
✅ User Authentication (Login / Signup) – using Passport.js

✅ Secure session handling with Cookies & Flash messages

✅ Create, Read, Update, Delete (CRUD) Listings

✅ Upload and store images using Cloudinary

✅ Leave reviews with star ratings

✅ Error handling for invalid routes and API misuse

✅ RESTful API endpoints

✅ Middleware for authorization & validation

✅ Responsive UI using EJS templating

🧑‍💻 Tech Stack
Frontend: EJS, HTML, CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: Passport.js

Image Hosting: Cloudinary

Session Management: Express-session, Connect-flash, Cookies

Validation & Security: Middleware, Custom Error Handling

API Style: RESTful

🛡️ Security & Validation
Input validation & sanitization for all forms

Flash messages for user feedback

Route protection using middleware

Backend error handling to prevent misuse via tools like Postman

Environment variables for sensitive data using .env

🔐 API Endpoints (REST)
Method	Endpoint	Description
GET	/listings	View all listings
POST	/listings	Create a new listing
GET	/listings/:id	View a specific listing
PUT	/listings/:id	Edit a listing
DELETE	/listings/:id	Delete a listing
POST	/listings/:id/reviews	Add a review

📝 Future Improvements
Add booking calendar and availability

Integrate payments using Stripe or Razorpay

Implement messaging between hosts and guests

Add profile management for users

🙋‍♂️ Author
Developer: Pratik Patil
📧 Email: official.pratikpatil3040@gmail.com

