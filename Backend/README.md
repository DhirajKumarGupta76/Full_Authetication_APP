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


## Authorization → Type → Bearer Token


## Middleware function
export const isAthenticated = async (req, res, next) => {

This is an authentication middleware.

It receives:

req  → request from client
res  → response to client
next → move to next function/controller

For example:

router.get("/profile", isAthenticated, getProfile);

Request
   ↓
isAthenticated
   ↓
Token valid?
   ↓
YES
   ↓
getProfile

JWT genuine and was it signed using my secret key?"


              Client
                │
                │ Authorization: Bearer JWT
                ↓
        isAthenticated()
                │
                ↓
       Get Authorization header
                │
                ↓
       Does Bearer token exist?
          /             \
        NO               YES
        ↓                 ↓
      401           Extract JWT
                          │
                          ↓
                    jwt.verify()
                          │
                    ┌─────┴─────┐
                  Invalid      Valid
                    ↓            ↓
                  400      Get user ID
                                 │
                                 ↓
                         Find user in DB
                                 │
                          ┌──────┴──────┐
                        Not found      Found
                           ↓             ↓
                         404      req.userId = ID
                                         │
                                         ↓
                                       next()
                                         │
                                         ↓
                                  Protected Controller


## Yup for data validation. It checks whether the data coming from the user is in the correct format before we process or save it.4
Email is required and valid
Password is required
Password has minimum length
confirmPassword matches newPassword
Name is required
OTP has exactly 6 digits