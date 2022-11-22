var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('about');
})
router.get('/gallery', function(req, res, next) {
    res.render('gallery');
})
router.get('/contact', function(req, res, next) {
    res.render('contact');
})
router.post('/submit', function(req, res, next) {
    var name = req.body.name
    var email = req.body.email
    var number = req.body.number
    fs.appendFile('data.txt', `name: ${name}, email: ${email}, number: ${number}`, function(e) {
        if (e) {
            console.log(e)
        }
    })
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pawan.demo.teach@gmail.com',
            pass: 'oxtfsemawpuxmtpw'
        }
    })
    var mailOptions = {
        from: 'pawan.demo.teach@gmail.com',
        to: req.body.email,
        subject: 'Ticket Booking Succesful',
        text: `Congratulations ${name} on booking your tickets to the upcoming Taylor Swift concert in New York.`
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            res.render('success')
        }
    })
})
module.exports = router;