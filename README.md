# Authentication System --- Step-by-Step Build Guide

A learning-focused guide to the Authentication project built with a
**React + Vite frontend** and a **Node.js + Express + MongoDB backend**.
It records the architecture, build order, API routes, verification
flows, testing process, and the debugging lessons from the project.

> **Project status note:** This guide combines the project details
> discussed so far. Some endpoint names and response fields changed
> during development, and a few routes were still being debugged. Check
> the actual files in your repository before treating every route below
> as confirmed.

------------------------------------------------------------------------

## 1. What the project does

The project is an authentication application with these planned/current
features:

-   User registration with username, email, and password.
-   Password hashing before saving a user to MongoDB.
-   Email verification using a token link.
-   Login and authentication using JWT.
-   User/session state in the React frontend.
-   Logout.
-   Forgot-password and OTP-based password-reset flow.
-   A React interface for Home, Sign Up, Login, email verification, and
    OTP verification.
-   API testing with Postman and database inspection with MongoDB
    Atlas/Compass.

The intended local development addresses are:

  Part                  Local address
  --------------------- -------------------------
  React/Vite frontend   `http://localhost:5173`
  Express backend       `http://localhost:8000`

## 2. Technology stack

### Frontend

-   React
-   Vite
-   React Router (`createBrowserRouter`, `RouterProvider`)
-   Axios / Fetch for HTTP requests
-   Sonner for toast notifications (`Toaster`)
-   Lucide React icons, including `Eye`, `EyeOff`, `Loader2`, and
    `UserPlus`
-   CSS/Tailwind utility classes for responsive UI

### Backend

-   Node.js (the development environment used Node `v24.14.0`)
-   Express (`5.2.1` was installed during development)
-   MongoDB and Mongoose (`9.11.0` was installed during development)
-   `bcryptjs` for password hashing
-   `jsonwebtoken` for JWT tokens
-   `nodemailer` for email delivery
-   Handlebars email template (`templete.hbs` was the filename
    discussed; confirm spelling in the project)
-   `dotenv` for environment variables
-   `nodemon` for restarting the server during development

## 3. Project structure

The backend folder discussed in the project was:

``` text
Full Backend/
└── Authetication/
    └── Backend/
        ├── server.js
        ├── Database/
        │   └── db.js
        ├── routes/
        │   └── userRoutes.js
        ├── controllers/
        │   └── userController.js
        ├── Models/
        │   ├── userModel.js
        │   └── Session.js              # if present in your current code
        ├── middleware/
        │   └── isAutheticated.js
        ├── templates/
        │   └── templete.hbs             # confirm actual folder/file name
        ├── .env
        └── package.json
```

The React frontend had files/components along these lines:

``` text
frontend/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── Context/
│   │   └── UserContext.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── Login.jsx
│       ├── SignUp.jsx
│       ├── Verify.jsx
│       ├── VerifyEmail.jsx
│       └── VerifyOTP.jsx
├── index.html
├── vite.config.js
└── package.json
```

Your actual names may differ. In particular, the backend path and
several filenames were originally spelled `Authetication` /
`isAutheticated`; avoid renaming them unless you also update every
import.

------------------------------------------------------------------------

## 4. How the application was built, from the beginning

### Step 1 --- Create the backend project

Open a terminal in the backend directory and initialise the Node
project:

``` bash
npm init -y
```

Install the packages used by the project:

``` bash
npm install express mongoose bcryptjs jsonwebtoken nodemailer dotenv
npm install --save-dev nodemon
```

If the project uses Handlebars to render email templates, install the
relevant Handlebars package used by your code. For example:

``` bash
npm install handlebars
```

Set `"type": "module"` in `package.json` if the backend uses `import`
and `export`. Add a development script such as:

``` json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Do not replace the entire existing `package.json` blindly; merge these
fields with the current file.

### Step 2 --- Configure environment variables

Create a `.env` file in the backend root. Use your own values and never
commit real secrets:

``` env
PORT=8000
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:5173
```

These names are examples. The names used in your code must match the
names in `.env` exactly. Do not share your MongoDB password, JWT secret,
or email app password.

**MongoDB setup lessons:** The database user is separate from your
MongoDB Atlas project user. Create a database user under Atlas database
access, use that username/password in the connection string, and allow
your current IP under Network Access. If the password contains special
characters, URL-encode them in the connection string. A deleted database
user can be recreated, but a deleted database/data may not be
recoverable unless a backup exists.

### Step 3 --- Connect Express to MongoDB

Create `Database/db.js` and export a connection function. The intended
flow is:

1.  Read the connection string from `process.env`.
2.  Call `mongoose.connect(...)`.
3.  Log success or report the connection error.
4.  Call this function from `server.js` before relying on database
    operations.

During development, the connection was eventually reported as
successful. Earlier errors included SRV/DNS connection failures and
TLS/network errors. Check the URI, database user, password, IP access
list, network, and Atlas cluster status before changing application
code.

### Step 4 --- Create the user model

The user schema discussed in this project included fields similar to:

-   `username`
-   `email`
-   `password` --- store the **hash**, not the plain-text password
-   `isverified`
-   `isLoggedIn`
-   `token`
-   `otp`
-   `otpExpiry`
-   Mongoose timestamps

The project also included a `Session` model for login-session
information. Confirm which fields and indexes are actually in your code.
Email should generally be unique, and validation should reject missing
or malformed fields.

Keep model files focused on schema/model definitions. One earlier
debugging issue was an accidental React import in the backend model;
backend model files should not import React.

### Step 5 --- Build the Express server

In `server.js`, the usual order is:

1.  Load environment variables.
2.  Create the Express app.
3.  Enable JSON request-body parsing with `express.json()`.
4.  Enable CORS for the frontend origin if the frontend and backend use
    different ports.
5.  Connect to MongoDB.
6.  Mount the user routes.
7.  Start listening on port `8000` (or the configured `PORT`).

The route mounting pattern discussed was similar to:

``` js
app.use("/user", userRoutes);
```

That prefix matters: if a router defines `router.post("/login", ...)`,
the complete URL is `/user/login`.

### Step 6 --- Add user routes and controllers

`routes/userRoutes.js` maps HTTP methods and paths to controller
functions. `controllers/userController.js` contains the actual
registration, verification, login, logout, and password-reset logic.

The route names discussed during development included:

  -------------------------------------------------------------------------
  Purpose                 Route discussed           Method
  ----------------------- ------------------------- -----------------------
  Register                `/user/resister`          POST

  Verify email            `/user/verify`            POST in the route being
                                                    debugged

  Login                   `/user/login`             POST

  Logout                  `/user/logout`            POST or as defined in
                                                    the router

  Forgot password         `/user/forgot-password`   POST

  Verify reset OTP        `/user/verify-otp`        Intended as POST, but a
                                                    `404 Cannot POST` error
                                                    showed that this route
                                                    was not registered at
                                                    that time
  -------------------------------------------------------------------------

**Important:** `resister` is a spelling mistake, but it was the route
used by the frontend in the current code. You can rename it to
`/register`, but update the backend route and every frontend/Postman
request together. Likewise, do not assume `/user/verify-otp` works until
you add the route and confirm it is mounted.

A controller typically: 1. Reads values from `req.body` or request
headers. 2. Validates them. 3. Finds or creates a MongoDB document. 4.
Returns a consistent JSON response and HTTP status. 5. Handles errors
without exposing secrets.

### Step 7 --- Implement registration and password hashing

The Sign Up page sends `username`, `email`, and `password` to the
backend. The registration controller should:

1.  Check that all required fields are present.
2.  Validate the email and password.
3.  Check whether the email already exists.
4.  Hash the password with `bcryptjs`.
5.  Create the user with verification initially false.
6.  Create an email-verification token and send a verification email.
7.  Return a JSON success/error response.

Never save or log the original password. The frontend request discussed
used Axios and the URL `http://localhost:8000/user/resister`. A `400`
response occurred during debugging, so inspect the response body and
compare the exact frontend field names with the controller's
destructuring. For example, the backend expecting `username` will not
receive it if the frontend sends `name`.

### Step 8 --- Send the email verification link

The project used Nodemailer with Gmail SMTP on port `587` and an email
template intended to contain a link like:

``` text
http://localhost:5173/verify/<token>
```

The email template may use a placeholder such as `{{token}}`. Ensure the
template renderer receives the same property name and that the frontend
route is `/verify/:token`.

Use a Gmail app password when required; do not put your regular Gmail
password in the source code. Verify that SMTP credentials and the sender
address are correct. A Nodemailer "Preview URL false" log alone does not
prove that a real email failed; check the send result and inbox/spam
folder.

### Step 9 --- Verify the email on the backend

The verification controller should: 1. Read the token from the request
in the format the backend expects. 2. Verify the token signature and
expiry. 3. Find the associated user. 4. Mark the user as verified. 5.
Clear or invalidate the one-time verification token, if your design uses
one. 6. Return a JSON response.

A key issue from the project was a frontend request to `/user/verify/`
receiving `404`. The backend route discussed was `POST /verify`,
which---when mounted under `/user`---becomes `POST /user/verify`. A
trailing slash may or may not be tolerated depending on configuration;
use the exact registered path and HTTP method.

The frontend route `/verify/:token` is a **browser page route**, not
automatically a backend API route. The page must extract the token from
React Router and send it to the backend using the method/body format the
backend expects.

### Step 10 --- Implement login and JWT authentication

The login controller should:

1.  Find the user by email.
2.  Check the password with `bcrypt.compare(...)`.
3.  Check whether email verification is required and completed.
4.  Create a signed JWT with a suitable expiry.
5.  Return the token and appropriate user details.
6.  Avoid returning the password hash.

The frontend login response was seen to include an `accessToken` field.
However, some frontend code checked `data.token`. Those names do not
match. Pick one consistent field name, for example `accessToken`, and
use it consistently when saving and reading the token.

A protected request commonly sends this header:

``` http
Authorization: Bearer <your_jwt_token>
```

In Postman, select **Authorization → Bearer Token** and paste only the
token into the token field; Postman adds the `Bearer` prefix. If
entering the header manually, include the prefix exactly once.

The authentication middleware should read the `Authorization` header,
extract the token, verify it using the same JWT secret, and attach the
decoded identity to the request before calling `next()`. A debugging
issue involved `startswith` instead of JavaScript's `startsWith`, and
incorrect string splitting. The common pattern is to split on a space
and take the token part, while handling a missing or malformed header
safely.

### Step 11 --- Add logout and session handling

The project had a `Session` model and a logout route. The correct logout
behaviour depends on the session design:

-   If using stateless JWT only, removing the token from frontend
    storage logs the browser out, but a copied token remains valid until
    expiry unless you implement revocation.
-   If storing sessions or refresh tokens, invalidate the relevant
    server-side session/token on logout as well.
-   Clear the frontend's token and user state after a successful logout.

Do not use `localStorage.clear()` as a general logout shortcut if the
app stores unrelated data there. Remove only the authentication keys you
own.

### Step 12 --- Add forgot-password and OTP verification

The intended reset flow was:

1.  User submits their email to `/user/forgot-password`.
2.  Backend creates a random six-digit OTP.
3.  Backend stores the OTP (preferably hashed) with a ten-minute expiry.
4.  Backend emails the OTP to the user.
5.  User submits the OTP to the verification endpoint.
6.  Backend checks the OTP and expiry, then grants permission to reset
    the password.
7.  User submits a new password.
8.  Backend hashes the new password and invalidates the OTP/reset
    permission.

The project was still debugging
`POST http://localhost:8000/user/verify-otp`, which returned
`404 Cannot POST /user/verify-otp`. That error usually means the exact
POST route is not registered/mounted at that URL; it is different from
an OTP being invalid. Add the controller and route, confirm
`app.use("/user", userRoutes)`, restart the server, and retest. Make
sure the frontend request body keys match the controller.

Use a cryptographically secure OTP generator, rate-limit requests and
attempts, and invalidate an OTP after successful use. Do not log OTPs in
production.

------------------------------------------------------------------------

## 5. Build the React frontend

### Step 13 --- Create the Vite React app

If starting from a new folder:

``` bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom axios sonner lucide-react
npm run dev
```

If the frontend already exists, do not recreate it; install only missing
dependencies.

### Step 14 --- Configure the router

The app used React Router's `createBrowserRouter` and `RouterProvider`,
with pages for Home, Login, Sign Up, Verify, and VerifyEmail. A typical
route map is:

``` jsx
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/verify/:token", element: <Verify /> },
  { path: "/verify-email", element: <VerifyEmail /> },
]);
```

Adapt this to the actual components. If the OTP screen is a separate
page, register its route too. Do not define duplicate routes for the
same path without a clear reason.

### Step 15 --- Connect the Sign Up and Login pages

The Sign Up page used React state for:

``` js
{ username: "", email: "", password: "" }
```

It used Axios to send a POST request to the backend, Sonner toast
messages, and navigation to `/login` after success. It also used Lucide
icons for the password visibility and loading controls.

The Login page sends credentials to `/user/login`. On success, it
should: 1. Read the exact token property returned by the backend. 2.
Store the token if the app uses browser storage. 3. update shared user
state/context. 4. Navigate to Home.

One debugging case showed the login response in the console, but the
user information was not visible on Home. That usually means the
response was received but the context was not updated correctly, the
Home page was reading a different property, or the provider did not wrap
the router/app. Confirm that `setUser(...)` receives the actual user
object from the response and that the component reads it using the same
context shape.

### Step 16 --- Add UserContext and the provider

The frontend setup discussed wrapped the app with `UserProvider` in
`main.jsx`, along with Sonner's `Toaster`. The context should provide a
consistent user value and setter (and optionally a function to fetch the
current user).

Conceptually:

``` jsx
<UserProvider>
  <App />
  <Toaster />
</UserProvider>
```

Use the actual export name and path consistently. A previous import
looked like `./Context/UserContext`; verify the filename's
capitalization and whether it exports a named `UserProvider` or a
default export. Import paths can behave differently across operating
systems and deployment environments.

When updating context after login, avoid calling
`setUser(response.data.user)` if `response` is actually a Fetch
`Response` object. Axios responses and Fetch responses have different
APIs. With Axios, the response body is generally `response.data`; with
Fetch, call `await response.json()` first.

### Step 17 --- Build verification and OTP screens

The email verification page extracts the token from `/verify/:token` and
calls the backend. The OTP screen collects the six-digit code and
submits it to the backend. Both pages should include:

-   Loading and disabled states while a request is in progress.
-   Clear success and error messages.
-   Validation for missing or incorrectly sized input.
-   A visible retry path where appropriate.
-   The exact backend route and request body format.

If the UI says "Something went wrong," inspect the browser Network tab
and backend terminal. A `404` points first to a route/method/URL
mismatch; a `400` or `401` usually means the request reached a route but
the payload or authentication was rejected.

------------------------------------------------------------------------

## 6. Start the project locally

Open two terminals.

**Terminal 1 --- Backend**

``` bash
cd "Full Backend/Authetication/Backend"
npm install
npm run dev
```

**Terminal 2 --- Frontend**

``` bash
cd path/to/frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Confirm that the backend is listening on
`http://localhost:8000` and that MongoDB connects successfully.

If your directory differs, use the real path on your computer. Never
commit `.env` to Git; add it to `.gitignore`.

## 7. Test the API in Postman

For JSON requests, select **Body → raw → JSON** and use
`Content-Type: application/json`.

### Register

-   Method: `POST`
-   URL: `http://localhost:8000/user/resister` (current spelling
    discussed)
-   Example body:

``` json
{
  "username": "Test User",
  "email": "test@example.com",
  "password": "Use-A-Strong-Test-Password"
}
```

Use an email address you control if you need to receive the verification
email. The exact body fields must match the controller.

### Verify email

-   Method: `POST` (as discussed for the current route)
-   URL: `http://localhost:8000/user/verify`
-   Send the token in the body or other location required by your actual
    controller.

Check `userRoutes.js` and `userController.js` to confirm whether the
token is expected in `req.body`, URL params, or a header.

### Login

-   Method: `POST`
-   URL: `http://localhost:8000/user/login`
-   Example body:

``` json
{
  "email": "test@example.com",
  "password": "Use-A-Strong-Test-Password"
}
```

Copy the returned JWT field (`accessToken` or whichever name your
backend actually returns).

### Protected endpoint / logout

In Postman, choose **Authorization → Bearer Token** and paste the JWT.
For logout, use the exact method and route defined in your router and
include the token if the route is protected.

### Forgot password / verify OTP

-   Forgot password: `POST http://localhost:8000/user/forgot-password`
-   OTP verification: the intended path was
    `POST http://localhost:8000/user/verify-otp`, but it previously
    returned `404`. Register and mount this route before testing it
    again.

The reset request and OTP request JSON keys must match the backend
controller. Do not assume the example paths are working until you
confirm them in `userRoutes.js`.

## 8. Common problems encountered and how to diagnose them

  ------------------------------------------------------------------------
  Symptom                              Likely check
  ------------------------------------ -----------------------------------
  `400 Bad Request` during             Compare JSON keys with `req.body`
  registration                         destructuring; check required
                                       fields and duplicate email

  `404 Cannot POST /user/verify`       Confirm POST method, exact path,
                                       router mount prefix, and trailing
                                       slash

  `404 Cannot POST /user/verify-otp`   Route may not exist or router may
                                       not be mounted; this is not by
                                       itself an invalid-OTP error

  "Unauthorised access" on             Check login credentials,
  login/protected request              verification status, token field
                                       name, Bearer header, JWT secret,
                                       and middleware

  Login succeeds but Home shows no     Confirm context provider wraps the
  user                                 app and `setUser` receives the
                                       actual user object

  `response.data` is undefined         Determine whether code uses Axios
                                       or Fetch; their response APIs
                                       differ

  MongoDB SRV/DNS or TLS error         Check Atlas URI, DB user
                                       credentials, network access list,
                                       cluster status, and network/DNS

  Email not received                   Check SMTP/app password, template
                                       rendering, recipient, send result,
                                       and spam folder

  Frontend request fails across ports  Configure CORS for
                                       `http://localhost:5173` and verify
                                       backend port

  CSS/gradient does not appear         Check whether Tailwind/CSS is
                                       configured, class spelling, and
                                       whether the relevant stylesheet is
                                       imported

  Vite warns about `__dirname`         In an ES-module Vite config,
                                       `__dirname` may not be defined as
                                       in CommonJS; inspect the config and
                                       use an ESM-compatible path approach
  ------------------------------------------------------------------------

When debugging, check the browser Console, browser Network tab (request
URL, method, status, response body), and backend terminal. Fix the first
concrete error instead of changing several files at once.

## 9. Security checklist before deployment

-   [ ] Store password hashes only; never store plain-text passwords.
-   [ ] Keep `.env` out of Git and rotate any secret that was
    accidentally exposed.
-   [ ] Use HTTPS in production.
-   [ ] Validate and rate-limit registration, login, forgot-password,
    and OTP endpoints.
-   [ ] Expire verification tokens, JWTs, and OTPs.
-   [ ] Invalidate OTPs after use and avoid revealing whether an email
    exists unnecessarily.
-   [ ] Return safe user fields only; never send password hashes or
    secrets to React.
-   [ ] Restrict CORS to the intended frontend origin in production.
-   [ ] Add server-side logout/session revocation if the security design
    requires it.
-   [ ] Avoid logging passwords, JWTs, reset tokens, or OTPs.
-   [ ] Confirm MongoDB Atlas network access and credentials are
    production-safe.
-   [ ] Test invalid, expired, missing, and already-used tokens/OTPs.

## 10. Recommended final verification checklist

-   [ ] Backend starts without syntax/import errors.
-   [ ] MongoDB connection succeeds.
-   [ ] Register creates a user with a password hash.
-   [ ] Verification email is sent and the verification token is
    accepted once.
-   [ ] Unverified users follow the intended login policy.
-   [ ] Valid login returns a JWT and safe user data.
-   [ ] Invalid credentials return a suitable error.
-   [ ] Protected routes reject missing/invalid/expired JWTs.
-   [ ] Logout clears frontend state and invalidates server-side
    sessions if implemented.
-   [ ] Forgot-password sends an OTP with a ten-minute expiry.
-   [ ] Wrong/expired OTPs are rejected; successful OTP use is
    invalidated.
-   [ ] Password reset hashes the new password.
-   [ ] Home displays the logged-in user from context.
-   [ ] All frontend API URLs match the registered backend routes.

## 11. How to read this project when revising

Follow the code in this order:

1.  `server.js` --- app setup, middleware, database connection, and
    route mounting.
2.  `Database/db.js` --- MongoDB connection.
3.  `Models/userModel.js` and `Models/Session.js` --- stored data
    structure.
4.  `routes/userRoutes.js` --- exact route/method mapping.
5.  `controllers/userController.js` --- registration, verification,
    login, logout, and reset logic.
6.  `middleware/isAutheticated.js` --- JWT validation for protected
    endpoints.
7.  Frontend `main.jsx` and `App.jsx` --- provider and router setup.
8.  `Context/UserContext.jsx` --- shared logged-in user state.
9.  `pages/SignUp.jsx` and `pages/Login.jsx` --- form submissions.
10. `pages/Verify.jsx`, `VerifyEmail.jsx`, and `VerifyOTP.jsx` ---
    token/OTP workflows.
11. Test each API in Postman, then test the complete flow in the
    browser.

The main lesson from this project is that authentication is an
end-to-end flow: **React form → API route → controller →
database/email/token logic → JSON response → frontend
state/navigation**. When something fails, trace the request through each
layer and verify the exact URL, method, body fields, and response shape.
