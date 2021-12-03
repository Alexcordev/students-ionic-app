const express = require("express");
const app = express();
const api = require("./api/mainRoutes/index");
const auth = require("./auth/routes/index");
const cors = require("cors");
const User = require("./auth/models/user");
const config = require('./config');
const mongoose = require("mongoose");
const connection = mongoose.connection;

// passport imports for auth and session
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Strategy = require("passport-local").Strategy;

app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  const allowedOrigins = [
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "http://192.168.2.14",
    "http://192.168.2.14:8100",
    "http://192.168.2.14:8101",
    "http://192.168.2.14:8102",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://127.0.0.1:8080",
    "http://localhost:4200",
    "http://localhost:8100",
    "http://localhost:8101",
    "http://localhost:8102",
    "http://localhost:4201",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
    name: config.cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passport local strategy configuration
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      if (email) email = email.toLowerCase();
      if (password) password = password;
      console.log("password", password);
      process.nextTick(function () {
        User.findOne({ email: email }, function (err, user) {
          if (err) return done(err);
          if (!user) return done(null, false);
          if (!user.validPassword(password)) return done(null, false);
          else return done(null, user);
        });
      });
    }
  )
);

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes middleware
app.use("/api", api);
app.use("/auth", auth);

app.use(express.static(__dirname+'/dist/student-management'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/student-management/index.html'));
});


// connection to mongoDB
const uri =

mongoose.connect(process.env.MONGODB_URI || config.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

connection.on("error", (err) => {
  console.error(`connection to MongoDB error: ${err.message}`);
});

connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(app.get("port"), () => {
    console.log(`Express server listening on port ${app.get("port")}`);
  });
});
