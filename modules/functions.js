let conn = require('./connect');

async function findinbook(query,res,type){
    try{
        await conn.getconnection();
        }
        catch{
            res.send("Error connecting to database");
            return;
        }

    console.log("Query = "+query)

    let collections = conn.getdb().collection(type);

    let result = await collections.find(query).toArray()
        .catch((error)=>{
            console.log("Something wrong happened")
        })

        .finally(()=>{
            conn.closedb();
            console.log("Closed Connection");
        });
  
        displayt(res,result);
}

function displayt(res,result){
    let html = "<html><body><table class = 'result'><tr><th>Name</th><th>ID</th><th>published date</th><th>authorid</th><th>author</th></tr>"
    for(i of result){
        html+="<tr><td>"+i.name+"</td><td>"+i.id+"</td>";
        html+="<td>"+i.date+"</td><td>"+i.authorid+"</td><td>"+i.authorname+"</td></tr>"
    }
    html+="</table><style>table,th,td{border : 1px solid black; border-collapse:collapse; border-color : blue;}";
    html+=".result{margin-left:auto;margin-right:auto}</style></body></html>";
    res.send(html);
}

function hello(){
    console.log("Hello");
}


async function insert(query,type,res){
    try{
        await conn.getconnection();
        }
        catch{
            res.send("Error connecting to database");
            return;
        }
    let collection = conn.getdb().collection(type);
    console.log("Entered collection");

    let dupli = {};
    dupli.id = query.id;

    let result = await collection.find(dupli).toArray()
        .catch((error)=>{
            console.log("Something wrong happened")
        })

    console.log("Duplication = "+result.length)
    if(result.length>0){
        console.log("Duplication = "+result.length)
        res.send("Duplication of id detected!!");
    }
    else{
        let dupli = {};
        dupli.authorid = query.authorid;

        result = await collection.findOne(dupli)
        .catch((error)=>{
            console.log("Something wrong happened")
        })

        if(result!=null&&result.authorname.toUpperCase()!==query.authorname.toUpperCase()){
            res.send("author id duplication!!");
        }

        else{
            await collection.insertOne(query).catch((error)=>{
                console.log("Couldn't insert")
            });
            res.send("Done");
        }
    }
    conn.closedb();
}

async function updatename(query,newdata,type,res){
    try{
    await conn.getconnection();
    }
    catch{
        res.send("Error connecting to database");
        return;
    }
    try{
    let collection = conn.getdb().collection(type);
    console.log("Entered collection");
    await collection.updateOne(query,{$set : newdata})
    res.send("Done");
    }
    catch{
        console.log("Error");
        res.send("Error");
    }
    conn.closedb();
}
module.exports = {findinbook,insert,updatename};