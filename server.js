let mongoose=require('mongoose');
let express = require('express');
let app = express();

let url = 'mongodb://localhost:27017/week7lab';
//connect to db
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/week7lab", function(err){
    if(err){
        console.log("err: ",err);
        throw err;
    } else {
        console.log("Connected Successfully");
    }
});

//import models
let developers = require("./models/developers");
let tasks = require("./models/tasks");

//set up the view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));

//access img folder
app.use(express.static('img'));
app.use(express.static('css'));

var filePath = __dirname + "/views/";

app.get("/adddeveloper/:firstname/:lastname/:level/:address", function(req,res){
    developers.create({
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        level: req.params.level,
        address: req.params.address
    },function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/getdeveloper");
        }
    });
});

app.get("/getdeveloper", function(req,res){
    developers.find().exec(function(err,data){
        if(err){
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

app.get("/addtask/:name/:assignto/:duedate/:status/:taskdesc",function(req,res){
    item.create({
        name: req.params.name,
        assignto: new mongoose.Types.ObjectId(req.params.assignto),
        duedate: new Date(req.params.duedate),
        status: req.params.status,
        taskdesc: req.params.taskdesc
    }, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/showtask");
        }
    });
});




app.get("/", function(req,res){
    let fileName = filePath + "index.html";
    res.sendFile(fileName);
});

app.get("/addtask", function(req, res){
    let fileName = filePath + "addnew.html";
    res.sendFile(fileName);
});

app.get("/deleteone", function(req,res){
    let fileName = filePath + "deleteone.html";
    res.sendFile(fileName);
})

app.get("/deleteall", function(req,res){
    let fileName = filePath + "deleteall.html";
    res.sendFile(fileName);
})

app.get("/update", function(req,res){
    let fileName = filePath + "update.html";
    res.sendFile(fileName);
})

app.get("/addmany", function(req,res){
    let fileName = filePath + "addmany.html";
    res.sendFile(fileName);
})

app.get("/showtask", function(req, res){
    //res.render("display",{myData: db});
    col.find({}).toArray(function(err,result){
        if(err){
            console.log("err: ", err);
        }
        else{
            res.render("display",{myData: result});
        }
    })
});

// app.get("/showtask", function(req,res){
//     item.find().populate('developers').exec(function(err,data){
//         if(err){
//             console.log(err);
//         } else {
//             res.send(data);
//         }
//     })
// });

app.post("/addnew", function(req, res){
    let data = req.body;
    col.insertOne(req.body,function(err,result){
        if(err){
            console.log('err: ',err);
        }
        else {
            res.redirect('showtask');
        }
    })
});

app.post("/addmany", function(req, res){
    let data = req.body;
    let task = [];
    for(let i=0;i<data.count;i++){
        task.push({
            name: data.taskname,
            assigned: data.assignedto,
            taskdue: data.taskdue,
            status: data.status,
            description: data.taskdesc
        })
    }
    col.insertMany(req.body,function(err,result){
        if(err){
            console.log('err: ',err);
        }
        else {
            res.redirect('showtask');
        }
    })
});

app.post('/update', function(req,res){
    let id = req.body.id
    let status = req.body.status;
    col.updateMany({__id:id},{$set:{status:status}},(err,result)=>{
        if(err){
            console.log('err: ',err);
        }
        else {
            res.redirect('showtask');
        }
    })
});

app.post('/delete_by_id',function(req,res){
    let __id = req.body.id;
    let id = new mongodb.ObjectID(__id);
    col.deleteOne({__id:id},function(err,result){
        if(err){
            console.log('err: ',err);
        }
        else {
            res.redirect('showtask');
        }
    })
});

app.post('/deleteall',function(req,res){
    col.deleteMany({'status': 'Complete'},function(err,result){
        if(err){
            console.log('err: ',err);
        }
        else {
            res.redirect('showtask');
        }
    })
});

app.listen(8000);