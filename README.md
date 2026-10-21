Full Authentication App
A full-stack authentication application built with React, Vite,
Node.js, Express, and MongoDB. It supports traditional email/password
authentication, email verification, JWT-based authorization,
password-reset workflows, and Google OAuth 2.0 sign-in.
Project note: This README combines the implementation details and
debugging history discussed during development. Route names and
response fields have changed at times. Before relying on an endpoint,
compare the table below with the current routes files and frontend
API calls in the repository.

Live Demo
- Frontend: https://full-authetication-app-frontend.onrender.com
- Backend: https://full-authetication-app-backend.onrender.com
The backend may not serve a user-facing webpage at its root URL. Test it
using the API routes below or a health endpoint if one is implemented.
Features
- User registration with username, email, and password
- Password hashing with bcryptjs
- Email verification using a verification token/link
- Login using email and password
- JWT-based authentication for protected requests
- Logout and frontend authentication-state cleanup
- Forgot-password workflow using a six-digit OTP with an intended
  ten-minute expiry
- Google sign-in using Passport.js and Google OAuth 2.0
- MongoDB persistence through Mongoose
- Shared user state in React using Context API
- Client-side routing with React Router
- Toast feedback with Sonner
- API testing with Postman
- Production deployment using Render
Some features, particularly OTP verification/password reset and
server-side session invalidation, must be checked against the current
source code before being described as fully production-ready.
Technology Stack
Frontend
- React
- Vite
- React Router (createBrowserRouter, RouterProvider)
- Axios for API requests
- Context API for shared user state
- Sonner for toast notifications
- Lucide React icons
- CSS/Tailwind utility classes, depending on the current UI
  implementation
Backend
- Node.js (development was performed with Node.js v24.x)
- Express
- MongoDB Atlas
- Mongoose
- bcryptjs for password hashing
- jsonwebtoken for JWT creation and verification
- Passport.js and passport-google-oauth20 for Google OAuth
- Nodemailer for email delivery
- Handlebars for email templates, if enabled in the current
  implementation
- dotenv for environment configuration
- cors for cross-origin requests
- nodemon for local development
Architecture
The application is split into a React frontend and an Express API.
MongoDB stores user data. Email verification and password-reset flows
use email delivery, while JWTs identify authenticated users on protected
API requests.
Browser
  |
  v
React + Vite frontend
  |  Axios / HTTP requests
  v
Express backend
  |-- Routes
  |-- Controllers
  |-- Authentication middleware
  |-- Passport Google OAuth
  |-- Nodemailer / email templates
  |
  v
MongoDB Atlas
Typical email/password flow
1. The user submits the registration form in React.
2. The frontend sends the registration data to the Express API.
3. The controller validates the input and hashes the password.
4. The user record is stored in MongoDB.
5. The backend sends an email-verification link.
6. The user opens the link and the frontend sends the token to the
   verification API.
7. The user logs in with their email and password.
8. The backend checks the password hash and verification status, then
   returns a JWT and safe user data.
9. The frontend stores the authentication token according to the
   current implementation and updates the shared user context.
10. Protected requests send the JWT in the Authorization header.
Google OAuth flow
1. The user chooses Login with Google.
2. The browser is redirected to the backend Google authentication
   route.
3. Passport redirects the user to Google for consent/sign-in.
4. Google redirects to the backend callback URL.
5. The Google strategy looks for an existing user by Google ID and then
   by email. The current design avoids silently creating a second
   account when the email already belongs to a password-based account.
6. If authentication succeeds, the backend creates a JWT and redirects
   the browser to the frontend auth-success route with the token.
7. The frontend auth-success page should read the token, establish the
   app's user state, and navigate to the intended page.
Account linking behavior: In the discussed implementation, an
existing account with the same email but no linked Google ID can produce
an error such as "An account with this email already exists. Please sign
in using your existing login method." This is an account-linking policy,
not necessarily a Google configuration error.
Repository Structure
The names below reflect the structure discussed during development. Your
repository may differ, so use the actual file names and casing from Git.
Full-Authentication-App/
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── Context/
│   │   │   └── UserContext.jsx
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── SignUp.jsx
│   │       ├── Verify.jsx
│   │       ├── VerifyEmail.jsx
│   │       ├── VerifyOTP.jsx
│   │       └── AuthSuccess.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Backend/
    ├── server.js
    ├── app.js                         # if the app is separated from server.js
    ├── Database/
    │   └── db.js
    ├── routes/
    │   ├── userRoutes.js
    │   └── authRoutes.js
    ├── controllers/
    │   └── userController.js
    ├── Models/
    │   ├── userModel.js
    │   └── Session.js                 # if present
    ├── middleware/
    │   └── isAuthenticated.js
    ├── config/
    │   └── passport.js                # or the actual Google strategy file
    ├── templates/
    │   └── templete.hbs               # verify the actual spelling/path
    ├── .env                           # local only; do not commit
    └── package.json
The original local folder was spelled Authetication in some paths.
JavaScript imports are sensitive to exact path spelling and
capitalization in many deployment environments.
Getting Started Locally
Prerequisites
- Node.js and npm
- A MongoDB Atlas cluster or local MongoDB instance
- A Gmail account/app password or another configured SMTP provider if
  email delivery is enabled
- Google OAuth credentials if Google sign-in is enabled
1. Clone the repository
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
Replace the placeholders with your actual Git repository URL and folder
name.
2. Install backend dependencies
cd Backend
npm install
The backend uses ES modules in the discussed setup ("type": "module"
in package.json). Typical scripts are:
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
Keep the existing package.json and merge scripts only if needed.
3. Configure backend environment variables
Create Backend/.env and provide the values required by your code. The
names below are examples; use the exact variable names referenced by
server.js, the database module, the email service, and the Passport
strategy.
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
JWT_SECRET=<long-random-secret>

FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000

EMAIL_USER=<email-address>
EMAIL_PASS=<email-app-password>

GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
Never commit real credentials. Add .env to .gitignore. If a
secret has ever been committed or shared, rotate it.
4. Start the backend
From the backend directory:
npm run dev
The local backend was configured to use port 8000 in the discussed
setup. If PORT is provided by the hosting platform, the server should
listen on process.env.PORT.
5. Install and start the frontend
Open a second terminal in the frontend directory:
npm install
npm run dev
Vite normally serves the app at:
http://localhost:5173
Configure the frontend API base URL to point to the local backend in
development and the deployed backend in production. Do not leave a
production fallback pointing to localhost.
Environment Configuration
  Variable                            Purpose
  PORT                              Port for the Express server; use
                                      the host-provided port in
                                      production

  MONGODB_URI                       MongoDB connection string

  JWT_SECRET                        Secret used to sign and verify JWTs

  FRONTEND_URL                      Frontend base URL used for
                                      redirects and email links

  BACKEND_URL                       Backend base URL, including OAuth
                                      callback construction

  EMAIL_USER                        SMTP/email account used to send
                                      messages

  EMAIL_PASS                        SMTP app password or provider
                                      credential

  GOOGLE_CLIENT_ID                  Google OAuth client ID
  GOOGLE_CLIENT_SECRET              Google OAuth client secret
The project has used more than one naming convention during development
(for example, CLIENT_URL versus FRONTEND_URL). Check the source code
and set the exact names it reads. Environment variable names are
case-sensitive.
API Routes
The table below records the route names discussed during development. It
is a route checklist, not a guarantee that every route is currently
registered. Confirm the method and path in routes/userRoutes.js and
routes/authRoutes.js.
Email/password routes
  Method            Path                      Purpose           Status / notes
  POST            /user/resister          Register a user   This misspelled path was used by the
                                                                frontend during development. Rename
                                                                to /user/register only if both
                                                                frontend and backend are updated.

  POST            /user/verify            Verify email      The discussed route accepted a token,
                                                                but confirm whether it expects a body
                                                                field or URL parameter.

  POST            /user/login             Sign in with      Response previously included an
                                              email/password    accessToken; keep frontend and
                                                                backend field names consistent.

  POST            /user/logout            Log out           Confirm whether it invalidates a
                                                                server-side session or only clears
                                                                frontend state.

  POST            /user/forgot-password   Request           Confirm the current controller and
                                              password-reset    email behavior.
                                              OTP               

  POST            /user/verify-otp        Verify reset OTP  This route previously returned
                                                                404 Cannot POST /user/verify-otp;
                                                                register and test it before
                                                            considering it complete.
The /user prefix comes from a route mount such as
app.use("/user", userRoutes). For example, a router route declared as
router.post("/login", ...) becomes POST /user/login.
Google OAuth routes
The discussed Google authentication router included:
  Method                  Path                      Purpose
  GET                   /auth/google            Start Google OAuth
                                                    sign-in

  GET                   /auth/google/callback   Handle Google's
                                                    callback

  GET                   /auth/me                Retrieve the
                                                    authenticated user's
                                                data, if implemented
The callback URL configured in Google Cloud Console must match the
backend callback URL exactly:
http://localhost:8000/auth/google/callback
Production callback:
https://full-authetication-app-backend.onrender.com/auth/google/callback
These routes assume the router is mounted at /auth. If the app mounts
it at a different prefix, update the Google Console URL and frontend
links accordingly.
User Data Model
The discussed user schema included fields similar to:
- username
- email
- password --- a bcrypt hash, never the plain-text password
- isverified
- isLoggedIn
- googleId --- for Google accounts, if present in the current schema
- avatar --- profile image URL from Google, if present
- token --- if verification/reset token storage is used
- otp and otpExpiry --- if the OTP flow is implemented
- Mongoose timestamps
A Session model was also discussed. Confirm its current fields and
whether it is actively used. Email should be uniquely constrained where
appropriate, and API responses should return only safe user fields.
Frontend Authentication State
The React app uses a shared context (discussed as UserContext.jsx) so
components can access the current user. The provider should wrap the
router/application at the root, for example:
<UserProvider>
  <App />
  <Toaster />
</UserProvider>
Use the actual export name from your context file.

After a successful login, the frontend should consistently:
1. Read the token field returned by the backend (the discussed response
   used accessToken).
2. Store the token using the chosen storage strategy.
3. Update context with the safe user object returned by the API.
4. Navigate to the home page.
When logging out, clear only the authentication keys managed by this app
rather than calling localStorage.clear(), which may delete unrelated
application data.
Email Verification
The intended flow sends a verification email after registration. The
email contains a frontend link similar to:
http://localhost:5173/verify/<token>
The frontend route /verify/:token is a React page route, not a
backend API endpoint. That page must extract the token and send it to
the backend using the exact HTTP method and payload expected by the
verification controller.

For production, build verification links from the deployed frontend URL.
Use a short-lived token, validate it on the backend, and invalidate it
after successful use if the design uses one-time tokens.
Password Reset and OTP
The planned flow is:
1. The user submits their email to the forgot-password endpoint.
2. The backend generates a six-digit OTP.
3. The backend associates the OTP with a short expiry (ten minutes was
   the intended duration).
4. The OTP is emailed to the user.
5. The user submits the OTP for verification.
6. After successful verification, the user is allowed to set a new
   password.
7. The backend hashes the new password and invalidates the OTP/reset
   authorization.
For a secure implementation, generate OTPs with a cryptographically
secure random generator, store a hash rather than the raw OTP where
practical, rate-limit requests and attempts, and invalidate OTPs after
use. Do not log OTPs in production.
JWT Authentication and Logout
Protected requests should send the token using the standard header:
Authorization: Bearer <JWT>
The authentication middleware should:
1. Read the Authorization header.
2. Confirm that it contains a Bearer token.
3. Verify the token with the same JWT_SECRET used to sign it.
4. Attach the decoded identity to the request.
5. Reject missing, malformed, invalid, or expired tokens.
JWT logout behavior depends on the implementation. Removing the token
from browser storage clears the local login state, but a stateless JWT
remains valid until expiry unless the backend revokes it or checks a
server-side session/token record. If a Session model is used, ensure
logout invalidates the relevant session.
Google OAuth Setup
1. Open Google Cloud Console and create/select a project.
2. Configure the OAuth consent screen.
3. Create an OAuth 2.0 Client ID for a web application.
4. Add the local frontend origin, such as http://localhost:5173, to
   authorized JavaScript origins if required by the configured flow.
5. Add the exact backend callback URL to authorized redirect URIs:
   - Local: http://localhost:8000/auth/google/callback
   - Production:
     https://full-authetication-app-backend.onrender.com/auth/google/callback
6. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the backend
   environment.
7. Set BACKEND_URL and FRONTEND_URL to the correct
   environment-specific URLs.
8. Redeploy the backend after changing production environment
   variables.
OAuth callback URLs must match exactly, including protocol, hostname,
path, and trailing-slash behavior. A redirect_uri_mismatch error
usually points to a mismatch between the callback generated by the
backend and the URL registered in Google Cloud Console.
Google account already exists
If Google sign-in fails with a message that an account with the same
email already exists, the current strategy may be intentionally
preventing duplicate accounts. The user should sign in with the existing
method unless account linking has been implemented. Supporting account
linking safely requires verifying ownership and explicitly associating
the Google ID with the existing account.
Deployment on Render
The discussed production URLs are:
- Frontend: https://full-authetication-app-frontend.onrender.com
- Backend: https://full-authetication-app-backend.onrender.com
Backend service
- Root directory: the backend directory containing its
  package.json
- Build command: npm install
- Start command: npm start (with "start": "node server.js") or
  node server.js
- Environment: configure all required variables in Render's
  Environment settings
- Port: listen on process.env.PORT
Frontend service
- Root directory: the frontend directory containing its
  package.json
- Build command: npm install && npm run build
- Publish directory: dist for a static Vite site
- API base URL: set the frontend's Vite environment variable to
  the deployed backend URL, using the exact variable name read by the
  frontend code
Vite-exposed variables generally need the VITE_ prefix. For example,
if the source reads import.meta.env.VITE_API_URL, configure
VITE_API_URL in Render. Redeploy after changing environment variables.
Production checklist
- Use the deployed frontend URL for FRONTEND_URL.
- Use the deployed backend URL for BACKEND_URL.
- Register the production Google callback URL in Google Cloud Console.
- Restrict CORS to the frontend origin.
- Ensure MongoDB Atlas permits connections from the deployed backend.
- Use HTTPS URLs for production email links and OAuth redirects.
- Confirm the frontend does not fall back to http://localhost:8000.
- Test registration, email delivery, login, Google OAuth, and logout
  on the deployed site.
Testing with Postman
For JSON requests, select Body → raw → JSON and set
Content-Type: application/json.
Register
POST http://localhost:8000/user/resister
Content-Type: application/json
{
  "username": "Test User",
  "email": "test@example.com",
  "password": "Use-A-Strong-Test-Password"
}
Use the actual registered route if it has been renamed.
Login
POST http://localhost:8000/user/login
Content-Type: application/json
{
  "email": "test@example.com",
  "password": "Use-A-Strong-Test-Password"
}
Use the token field returned by the backend for protected requests. In
Postman, choose Authorization → Bearer Token and paste the token
without manually adding a second Bearer prefix.
Google OAuth
Google OAuth is a browser redirect flow. Open the backend's Google start
route in a browser rather than expecting the complete interactive flow
to behave like a normal JSON login request in Postman.
Common Problems and Troubleshooting
  Symptom                              What to check
  400 Bad Request during             Compare frontend JSON keys with
  registration                         req.body; check required fields,
                                       validation, and duplicate email
                                       handling.

  404 Cannot POST /user/verify       Check HTTP method, exact route,
                                       router mount prefix, and request
                                       URL.

  404 Cannot POST /user/verify-otp   The route may not be registered or
                                       mounted. A 404 is not the same as
                                       an invalid OTP.

  Login succeeds but the Home page     Check that the context provider
  shows no user                        wraps the app and that the context
                                       setter receives the actual user
                                       object.

  response.data is undefined         Axios uses response.data; Fetch
                                       requires await response.json().

  JWT rejected by middleware           Check Authorization: Bearer ...,
                                       token field name, expiry, JWT
                                       secret, and token parsing.

  Google callback is reached but       Inspect Passport strategy errors
  sign-in fails                        and account lookup logic. An
                                       existing email without a linked
                                       Google ID may be rejected by
                                       design.

  redirect_uri_mismatch              Make the callback URL in Google
                                       Cloud Console exactly match the
                                       backend's generated callback URL.

  MongoDB SRV/DNS or TLS error         Check the Atlas URI, database user
                                       credentials, network access list,
                                       cluster status, DNS/network
                                       connectivity, and TLS environment.

  Email is not received                Check SMTP credentials/app
                                       password, template rendering,
                                       recipient address, send result,
                                       spam folder, and provider
                                       restrictions.

  Frontend API requests fail across    Check CORS origin, frontend API
  ports/domains                        base URL, backend port, and
                                       production environment variables.

  Render starts but API requests fail  Review Render logs, environment
                                       variables, health/startup output,
                                       and the actual request URL in the
                                       browser Network tab.

  Vite warns about __dirname         In an ES-module Vite config, use an
                                       ESM-compatible path approach rather
                                       than assuming CommonJS globals
                                   exist.
Debugging workflow
1. Open browser DevTools → Network.
2. Select the failed request and inspect its URL, method, status code,
   request body, and response body.
3. Read the backend terminal or Render logs at the same timestamp.
4. Confirm the route is mounted and the controller is being reached.
5. Fix one concrete mismatch at a time, then retest.
Security Checklist
- [ ] Hash passwords; never store plain-text passwords.
- [ ] Keep .env and all credentials out of Git.
- [ ] Rotate secrets that may have been exposed.
- [ ] Use HTTPS in production.
- [ ] Validate inputs on the backend.
- [ ] Rate-limit login, registration, OTP, and password-reset
  endpoints.
- [ ] Expire verification tokens, JWTs, and OTPs.
- [ ] Invalidate OTPs after use.
- [ ] Return only safe user fields; never return password hashes or
  secrets.
- [ ] Restrict CORS to trusted origins.
- [ ] Avoid logging passwords, JWTs, verification tokens, or OTPs.
- [ ] Decide whether logout requires server-side session/token
  revocation.
- [ ] Test missing, malformed, invalid, expired, and already-used
  tokens.
- [ ] Use a secure cookie strategy or carefully protect browser-stored
  tokens based on the application's threat model.
Verification Checklist Before Calling the Project Complete
- [ ] Backend starts without import or syntax errors.
- [ ] MongoDB connects successfully.
- [ ] Registration validates input and stores a password hash.
- [ ] Verification email is sent and its token is validated.
- [ ] The app enforces the intended unverified-user login policy.
- [ ] Valid login returns a JWT and safe user data.
- [ ] Invalid credentials and invalid tokens are rejected.
- [ ] Protected routes reject missing and expired JWTs.
- [ ] Logout clears frontend state and invalidates server-side
  sessions if implemented.
- [ ] Forgot-password and OTP verification work end to end.
- [ ] Password reset hashes the new password and invalidates reset
  authorization.
- [ ] Google OAuth works locally and in production.
- [ ] Existing-email behavior during Google login is intentional and
  documented.
- [ ] Home displays the correct logged-in user from context.
- [ ] Frontend API URLs and backend route names match.
- [ ] No production request falls back to localhost.
Suggested Code Reading Order
To understand how data moves through the project, read the code in this
order:
1. server.js / app.js --- middleware, startup, and route mounting
2. Database/db.js --- MongoDB connection
3. Models/userModel.js and Models/Session.js --- data structure
4. routes/userRoutes.js and routes/authRoutes.js --- HTTP route
   mapping
5. controllers/userController.js --- registration, verification,
   login, and reset logic
6. middleware/isAuthenticated.js --- JWT validation
7. Google Passport strategy configuration --- Google profile lookup and
   account creation
8. Frontend main.jsx and App.jsx --- provider and route setup
9. Context/UserContext.jsx --- shared user state
10. pages/SignUp.jsx and pages/Login.jsx --- form submission
11. Verification, OTP, and auth-success pages --- email/OTP/OAuth
    completion
12. Test each API in Postman, then test the complete browser flow
Learning Outcome
This project demonstrates how authentication is an end-to-end process:

React form → API route → controller → validation/database/email/token
logic → JSON response or redirect → frontend context/navigation.

When debugging, trace the request through every layer and check the
exact route, HTTP method, request fields, response shape, token format,
environment variables, and deployment URL.
License
Add a license file and update this section if you intend to publish the
project for reuse. Until then, no license is specified.

