// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoDBStore = require('connect-mongo')(session);
const { getFileStream } = require('./utils/s3');

const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const roomRoutes = require('./routes/rooms');
const designRoutes = require('./routes/designs');
const itemCategoryRoutes = require('./routes/itemCategories');
const itemRoutes = require('./routes/items');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
  replaceWith: '_'
}))

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60
});

store.on('error', function (e) {
  console.log('session store error', e)
})

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig))
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.viglink.com/api/",
  "http://cdn.viglink.com/api/",
  "https://api.viglink.com/api/ping",
  "https://api.viglink.com/api/domains",
  "https://api.viglink.com/api/sync.js",
  "https://static.hotjar.com/",
  "https://script.hotjar.com/"
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/"
];

const fontSrcUrls = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com"
];


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/drlgdeolb/",
        "https://res.cloudinary.com/dhiwlvpg7/",
        "https://res.cloudinary.com/decorelm/",
        "https://images.unsplash.com/",
        "https://blog.decorelm.com",
        "https://api.viglink.com/api/sync.gif"
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
      frameSrc: [
        "'self'",
        "https://floorplanner.com/",
        "https://vars.hotjar.com/"
      ],
      connectSrc: [
        "https://in.hotjar.com/api/",
        "https://vc.hotjar.io/sessions/"
      ]
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', userRoutes);
app.use('/projects', projectRoutes);
app.use('/projects/:id/rooms', roomRoutes);
app.use('/projects/:id/rooms/:roomId/item-categories', itemCategoryRoutes);
app.use('/projects/:id/rooms/:roomId/designs', designRoutes);
app.use('/projects/:id/rooms/:roomId/item-categories/:itemCategoryId/items', itemRoutes);

app.get('/', (req, res) => {
  res.redirect('/projects')
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`)
})


