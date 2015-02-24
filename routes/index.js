var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var crypto = require('crypto');
var Post = require('../models/post.js');
/* GET home page. */


router.get('/', function(req, res) {
	Post.get(null, function(err, posts) {
		if(err) {
			posts= [];
		}
		res.render('index', { 
			title: 'Homepage' ,
			posts: posts,
            cpage:'home'
		});
	});
});

router.get('/reg', checkNotLogin);

router.get('/reg', function(req, res) {
	res.render('reg', {
        title: 'User Reg',
        cpage:'reg'});
});

router.post('/reg', checkNotLogin);

router.post('/reg', function(req ,res) {
	//check password 
	if (req.body['password-repeat'] != req.body['password']) {
		req.flash('error', 'password not equal');
		return res.redirect('/reg');
	}
	//gen md5 password
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	var newUser = new User({
		name: req.body.username,
		password: password,
	});
	console.log('0');
	//check user 
	User.get(newUser.name, function(err, user) {
		if (user)
			err = 'Username already exists.';
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}
		console.log('1');
		//add new user if doesnt exists
		newUser.save(function(err) {
			console.log('2');
			if (err) {
				console.log('3');
				req.flash('error', err);
				return res.redirect('/reg');
			}
			console.log('4');
			req.session.user = newUser;
			req.flash('success', 'Reg Success!');
			res.redirect('/');
		});
	});
});

router.get('/login', checkNotLogin);

router.get('/login', function(req, res) {
	res.render('login', {
        title: 'User Login',
        cpage:'login'
    });
});

router.post('/login', checkNotLogin);

router.post('/login', function(req, res) {
	//generate md5
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	User.get(req.body.username, function(err, user) {
		if (!user) {	
			req.flash('error', 'User does not exists');
			return res.redirect('/login');
		}
		if (user.password != password) {
			req.flash('error', 'Password error..');
			res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', 'Login Success.');
		res.redirect('/');
	});
});

router.get('/logout', checkLogin);

router.get('/logout', function(req,res) {
	req.session.user = null;
	req.flash('success', 'Logout Success');
	res.redirect('/');
});



router.get('/u/:user', function(req, res) {
	User.get(req.params.user, function(err, user) {
		if(!user) {
			req.flash('error', 'User does not exist');
			return res.redirect('/');
		}
		Post.get(user.name, function(err, posts) {
			if(err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('user',{
				title: user.name,
				posts: posts,
                cpage:'user'
			});
		});
	});
});

router.post('/post', checkLogin);

router.post('/post', function(req, res) {
	var currentUser = req.session.user;
	var post = new Post(currentUser.name, req.body.post);
	post.save(function(err) {
		if(err){
			req.flash('error', err);
			return res.redirect('/');
		}
		req.flash('success', 'Post success');
		res.redirect('/u/' + currentUser.name);
	});
});


function checkLogin(req, res, next){
	if(!req.session.user){
		req.flash('error', 'Not login');
		return res.redirect('/login');
	}
	next();
}

function checkNotLogin(req, res, next) {
	if(req.session.user){
		req.flash('error', 'Login');
		return res.redirect('/');
	}
	next();
}






module.exports = router;
