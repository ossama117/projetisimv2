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
    database:"ISIM2"
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
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    }
  });
});

app.post("/updateEtudiantActif", (req, res) => {
    const { CEF, EtudiantActif } = req.body;
    const sql = "UPDATE liststagiaire SET EtudiantActif = ? WHERE CEF = ?";
    db.query(sql, [EtudiantActif, CEF], (err, result) => {
        if (err) {
            console.error("Error updating EtudiantActif:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        return res.json({ success: true, message: "EtudiantActif updated successfully" });
    });
});
app.post("/updateUser/:CEF", (req, res) => {
    const CEF = req.params.CEF;
    const { Nom, Prenom, NTelelephone, Email, password } = req.body;
    

    if (!Nom || !Prenom || !NTelelephone || !Email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "UPDATE liststagiaire SET Nom = ?, Prenom = ?, NTelelephone = ?, Email = ?, password = ? WHERE CEF = ?";
    db.query(sql, [Nom, Prenom, NTelelephone, Email, password, CEF], (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json({ success: true, message: "User updated successfully" });
    });
});

app.get("/stagiaire/:CEF", (req, res) => {
    const CEF = req.params.CEF;

    const sql = "SELECT * FROM liststagiaire WHERE CEF = ?";
    db.query(sql, [CEF], (err, result) => {
        if (err) {
            console.error("Error fetching user data:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(result[0]);
    });
});



app.post("/changePhoneNumber", (req, res) => {
    const { newPhoneNumber } = req.body;
    const { username } = req.session;
    
    if (!username) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sql = "UPDATE `liststagiaire` SET NTelelephone = ? WHERE Nom = ?";
    db.query(sql, [newPhoneNumber, username[0].Nom], (err, result) => {
        if (err) {
            console.error("Error updating phone number:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "Phone number updated successfully" });
    });
});

app.post("/addEmail", (req, res) => {
    const { newEmail } = req.body;
    const { username } = req.session;
  
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const sql = "UPDATE `liststagiaire` SET Email = ? WHERE Nom = ?";
    db.query(sql, [newEmail, username[0].Nom], (err, result) => {
      if (err) {
        console.error("Error updating email:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json({ message: "Email updated successfully" });
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