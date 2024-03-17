import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge:1000*60*60*24
    }
}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database:"isim"
})



app.get("/stagiaire", (req, res) => {
    if (req.session.username) {
        return res.json({valid:true,user:req.session.username})
    } else {
        return res.json({ valid: false })
    }
})

app.get("/admin", (req, res) => {
    if (req.session.username="admin") {
        const sql = "SELECT * FROM `liststagiaire`";
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Error fetching stagiaire data:", err);
                return res.status(500).json({ valid:false, message: "Internal server error" });
            }
            res.json({valid: true, user: result});
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});


app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.clearCookie("your_cookie_name");
      res.status(200).json({ message: "Logged out successfully" });
    }
  });
});


app.post('/login', (req, res) => {
    const sqlstg = "SELECT * FROM `liststagiaire` WHERE Nom = ? AND password=?";
    const sqladm="SELECT * FROM `listadmin` WHERE nom=? AND password=?";
    if (req.body.name === "admin") {
        db.query(sqladm, [req.body.name, req.body.password], (err, result) => {
        if (err) return res.json({ Message: 'error inside server' });
        if (result.length > 0) {
            return res.json({Login:true,type:"admin" })
        } else {
            return res.json({ Login: false})
            
        }
    })
    } else {
        
        db.query(sqlstg, [req.body.name, req.body.password], (err, result) => {
    
            if (err) return res.json({ Message: 'error inside server' });
            if (result.length > 0) {
                req.session.username = result;
                console.log(req.session.username)
                return res.json({Login:true,type:"user" })
            } else {
                return res.json({ Login: false})
                
            }
        })
    }
})

app.listen(8081, () => {
    console.log("connected to the server");
})