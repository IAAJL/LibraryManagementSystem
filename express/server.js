
let express = require('express');
let app = express();
let path = require('path');

let bodyparser = require('body-parser');

let func = require('../modules/functions');

app.use(bodyparser.urlencoded({extended:false}));

let views = path.join(__dirname,'..','views');

app.set('view engine','pug');

app.get('/',(req,res)=>{
    res.render(views+'/index.ejs');
  // res.sendFile(path.join(__dirname,'..','views','test.html'))
})

app.get('/search',(req,res)=>{
    res.render(views+'/search.ejs',{title : "Search"})
})

app.get('/insert',(req,res)=>{
    res.render(views+'/insert.ejs',{title:"Insert"})
})

app.get('/report',(req,res)=>{
    res.render(views+'/report.ejs',{title:"Insert"})
})

app.get('/getbydate',(req,res)=>{
    res.render(views+'/getbydate.ejs',{title:"Insert"})
})

app.get('/updatename',(req,res)=>{
    res.render(views+'/name.ejs',{title:"Insert"})
})

app.post('/searchdb',(req,res)=>{
    console.log(req.body.type);
    let val = {};
    let id =Number(req.body.typeid);
    console.log("ID = "+id)
    if(id!=0)
    val.id = id;
    val.name = req.body.name;
    func.findinbook(val,res,req.body.type)
        .catch((error)=>{
            console.log(error);
        });
    // functions.hello();
    //res.send("done");
})

app.post('/insertdb',(req,res)=>{
    let query = {};
    query.id = Number(req.body.typeid);
    query.name=req.body.name;
    query.date = req.body.published;
    query.authorid = Number(req.body.authid);
    query.authorname = req.body.authname;

    func.insert(query,req.body.type,res);

    console.log(query);
    console.log(req.body.type);
})

app.post('/reportdb',(req,res)=>{
    query={};
    func.findinbook(query,res,req.body.type);
})

app.post('/getbydatedb',(req,res)=>{
    query={};
    query.date=req.body.date;
    func.findinbook(query,res,req.body.type);
})

app.post('/updatename',(req,res)=>{
    query={};
    query.id=Number(req.body.id);
    newdata ={};
    newdata.name = req.body.name;
    func.updatename(query,newdata,req.body.type,res);
})

const server = app.listen(8000,()=>{
    console.log("Server running in "+server.address().port);
});