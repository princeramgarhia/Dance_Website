const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fs =require('fs'); 
const app = express();
const port = 800;
// const host = 127.0.0.1;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())  

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug',params);
})
app.get('/classinfo', (req, res)=>{ 
    const params = { }
    res.status(200).render('classinfo.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.post('/contact', (req, res)=>{ 
    const params = { }
    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.email;
    const More=req.body.More;
    const dance_type=req.body.dance_type;
    const output=(` name : ${name}\n phone :${phone}\n email :${email}\n More about myself :${More}\n Dance_type : ${dance_type}`)
    fs.writeFileSync('output.txt',output);
    res.status(200).render('contact.pug', params);

    // CONNECTING MONGOBD TO NODEJS
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/princekart', {useNewUrlParser: true,useUnifiedTopology: true})
    //HERE PRINCEKART IS OUR DATABASE IN WHICH OUR COLLECTIONS WILL STORE 
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    

    // DECLARING SCHEMA 
    const dance_schema = new mongoose.Schema({
        name: String,
        // phone_number:string,
        email:String,
        dance_type:String,
        more:String
      });
    //   CONVERTING SCHEMA INTO MODEL 

      const dance_model = mongoose.model('candidate',dance_schema );// CANDIDATE IS OUR COLLECTION IN WHICH OUR DOCUMENTS WILL STORE. IN MONGODB CANDIDATE BECOMES CANDIDATES AUTOMATICALLY. 

    //   CREATING DOCUMENT OF MODEL 
    //   const candidate1 = new dance_model({ name: req.body.name, email:req.body.email, dance_type:req.body.dance_type,  more:req.body.More });      //WE CAN GET OBJECT LIKE THIS ALSO

    //   OR 
    const candidate1 = new dance_model(req.body);
    
    //SAVING DOCUMENT THAT WE JUST CREATED
      candidate1.save(function (err, candidate1) {
        if (err) return console.error(err);
        });
});

})

// START THE SERVER
app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`)
  })