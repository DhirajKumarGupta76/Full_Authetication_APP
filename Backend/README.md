## Create a full Authetication from scretch
first create backend then frontend 


## npm i mongoose express bcryptjs jsonwebtoken
npm i -D nodemon

| Package        | Purpose                                             |
| -------------- | --------------------------------------------------- |
| `express`      | Creates the backend/server and APIs                 |
| `mongoose`     | Connects Node.js with MongoDB                       |
| `bcryptjs`     | Hashes passwords securely                           |
| `jsonwebtoken` | Creates and verifies JWT tokens for authentication  |
| `nodemon`      | Automatically restarts the server when code changes |

npm i -D nodemon
npm run dev


## Routers
Express Router helps us group related API routes into separate, manageable modules instead of putting all routes inside server.js.

const router = express.Router();
Router helps us define and organize different URLs (routes) for different operations.

router.post("/register", resisterUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

## Controllers
A controller function decides what should happen when a user calls an API.

Then registerUser() can:

Get data from the request
Validate the data
Check the database
Create/update/delete data
Hash the password
Generate JWT
Send a response

Customer
   ↓
Waiter (Route)
   ↓
Kitchen (Controller)
   ↓
Ingredients/Storage (Model + Database)
   ↓
Kitchen
   ↓
Waiter
   ↓
Customer


## Stack OverFlow

What is Stack Overflow?

Stack Overflow is a website where developers:

Ask programming questions
Get answers from other developers
Find solutions to errors
See examples of working code
Learn from discussions and explanations

## Learn About Templete.hbs
