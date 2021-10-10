const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require("bcryptjs");
const app = express();
const port = 3001;
// const User = require("/models/User.js");
// const validateLoginInput = require("../validation/login");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user1:user1@cluster0.1ritr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// create collection device
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   if (err) throw err;
//   console.log("Database created!");
//   client.close();
// });


// createCollection
// client.connect(err => {
  
//   // perform actions on the collection object
//   if (err) throw err;
//   var dbase = client.db("dbmongo"); //here
//   dbase.createCollection("users", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     client.close();
//   });
// });



// createCollection
// client.connect(err => {
  
//   // perform actions on the collection object
//   if (err) throw err;
//   var dbase = client.db("dbmongo"); //here
//   dbase.createCollection("articles", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     client.close();
//   });
// });




var dbo = client.db("dbmongo");
const quotesCollection = dbo.collection('users')




app.post('/user', (req, res) => {
    res.send({
        message: 'CREATE NEW USER: POST /user',
        body: req.body
    });
});




// app.get('/', (req, res) => {
//     return res
//         .status(200)
//         .jsonp({               
//         info: "Success"
//     });
// });
app.get('/hai', (req, res) => {
  res.send('Hello World!')
});




app.get('/user', (req, res) => {
    // res.send('GET USER LIST: GET /user');
    res.send('GET USER LIST: GET /user');
    var users = {
        "users":""
    };
	client.connect(function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("dbmongo");
	  dbo.collection("users").findOne({}, function(err, result) {
	    if (err) throw err;
	    console.log(result.name);
	    db.close();
	  });
	});

});

app.get('/userlist', (req, res) => {
	client.connect(function(err, db) {
		if (err) throw err;
		var dbo = db.db("dbmongo");
		dbo.collection('users').find().toArray()
			.then(result => {
				// console.log(result)
				// return res
			 //    .status(200)
			 //    .jsonp({
			 //        info: "list user .",
			 //        user: result
			 //    });
			 res.render('userlist.ejs', {quotes: result})


			})
			.catch(error => console.error(error))
		// console.log(result);
	    // db.close();

	});


    // return res
    // .status(200)
    // .jsonp({
    //     info: "list user .",
    //     user: result
    // });






	// db.collection('quotes').find().toArray()
	//     .then(results => {
	//       console.log(results)
	//     })
	//     .catch(error => console.error(error))
});


app.get('/user/:id', (req, res) => {
    res.send('GET USER: GET /user/' + req.params.id);
});


// app.post('/login', (req, res) => {
//     res.send('LOGIN: POST /login, logged in as "' + req.body.username + '"');
// });


app.post('/login', function(req, res) {

    var username = req.body.username,
        password = req.body.password;

	client.connect(function(err, db) {
		if (err) throw err;
		var dbo = db.db("dbmongo");
		dbo.collection('users').findOne({username: username})
			.then(result => {
				if(err) throw err;

				res.render('logged.ejs', {quotes: result})
				console.log(result)
				// return res
			 //    .status(200)
			 //    .jsonp({
			 // //        info: "list user .",
			 //        user: result
			 //    });
			 // res.render('userlist.ejs', {quotes: result})


			})
			.catch(error => console.error(error))
		// console.log(result);
	    // db.close();

	});



});


app.post('/logout', (req, res) => {
    res.send('LOGOUT: POST /logout');
});

app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});




router.post("/register",(req,res) =>{
    const {errors,isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({'email' : 'Alamat email sudah digunakan'});
            }else{
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
                });
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                        return res.json(newUser);
                    })
                });
            }
        })
});



app.post("/register",async (req,res) =>{

	client.connect(function(err, db) {
		if (err) throw err;
		var dbo = db.db("dbmongo");
		dbo.collection("users").insertOne(req.body)
			.then(result => {
				console.log(result)
			})
			.catch(error => console.error(error))
		// console.log(result);
	    // db.close();

	});
    return res
    .status(200)
    .jsonp({
        info: "register sukses.",
    });


	// quotesCollection.insertOne(req.body)
 //    .then(result => {
 //      console.log(result)
 //    })
 //    .catch(error => console.error(error))

});



app.post("/createarticle",async (req,res) =>{

	client.connect(function(err, db) {
		if (err) throw err;
		var dbo = db.db("dbmongo");
		dbo.collection("articles").insertOne(req.body)
			.then(result => {
				console.log(result)
			})
			.catch(error => console.error(error))
		// console.log(result);
	    // db.close();

	});
    return res
    .status(200)
    .jsonp({
        info: "post artikel sukses.",
    });


	// quotesCollection.insertOne(req.body)
 //    .then(result => {
 //      console.log(result)
 //    })
 //    .catch(error => console.error(error))

});


// app.get('/articles', (req, res) => {
// 	client.connect(function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("dbmongo");
// 		dbo.collection('articles').find().toArray()

		



// 			.then(result => {
// 			//  res.render('articles.ejs', {quotes: result})


// 			 return res
// 			    .status(200)
// 			    .json({result}
			        
			       
					
// 			    );
// 			})
// 			.catch(error => console.error(error))
// 		// console.log(result);
// 	    // db.close();
		

// 	});

// });






app.get('/articles', (req, res) => {
	client.connect(function(err, db) {
		if (err) throw err;
		var dbo = db.db("dbmongo");
		dbo.collection('articles').find().toArray(
			function(err, result) { 
				if (err) throw err; 
          return res
		  .status(200)
			    .json(result)
		  
		  ; 
			}
		)

		




		// console.log(result);
	    // db.close();
		

	});

});
app.get('/test', function (req, res) {
  res.send('Test successful')
})


export default {
  path: '/api',
  handler: app
}



module.exports = router;