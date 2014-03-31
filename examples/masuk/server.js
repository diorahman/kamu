var express = require ('express');
var passport = require ('passport');
var partials = require ('express-partials');
var AkuStrategy = require('../..').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new AkuStrategy({
    returnURL: 'http://localhost:3000/auth/aku/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {

    process.nextTick(function () {

      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

var server = express();

server.configure(function() {
  server.use (partials());
  server.set('views', __dirname + '/views');
  server.set('view engine', 'ejs');
  server.use(express.logger());
  server.use(express.cookieParser());
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(express.session({ secret: 'aku kamu' }));

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(server.router);
});


server.get('/', function(req, res){
  res.render('index', { user: req.user });
});

server.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

server.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

server.get('/auth/aku', 
  passport.authenticate('aku', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

server.get('/auth/aku/return', 
  passport.authenticate('aku', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

server.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

server.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


