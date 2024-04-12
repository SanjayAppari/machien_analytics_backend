var jwt = require('jsonwebtoken');
const JWT_SECRET = "ShhhhSecret";


const fetchCompany = (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"no Please authenticate using valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.company = data.company;
        console.log(data.company);
    } catch (err) {
        res.status(401).send({error:"Please authenticate using valid token"}); 
    }
    next();
}


module.exports = fetchCompany;