 const SECRET_KEY = process.env.SECRET_KEY;
 const jwt  = require("jsonwebtoken");

const auth = (req, res, next) => {


    try {
        let token = req.headers.authorization;

        if(token){
            token = token.split(" ")[1]; // Extract token from "Bearer <token>"
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        }
        else {
            res.status(401).json({ message: "Unauthorized access" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = auth;