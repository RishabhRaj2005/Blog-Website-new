import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var title =[];
var blog=[];
app.get("/",(req,res)=>{
    res.render("index.ejs",{t:title , b:blog});
});

app.get("/post",(req,res)=>{
    res.render("post.ejs");
});

app.post("/post",(req,res)=>{
    title.push(req.body["title"]);
    title.push(req.body["post"]);
    res.redirect("/");
})

app.get("/delete",(req,res)=>{
    res.render("delete.ejs",{t:title , b:blog});
});

app.post("/delete",(req,res)=>{
    var toDel = req.body["dTitle"];
    var flag=0;
    for(var i=0;i<title.length;i++){
        if(title[i]===toDel){
            flag=i;
            break;
        }
    }
    title.splice(flag,(flag+1));
    blog.splice(flag,(flag+1));
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`The app is running on ${port}`);
})