import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json({ success : false,message : "User not logged in"});
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if (tokenDecode.Id) {
            req.body.userId = tokenDecode.Id;
        }
        else{
            return res.json({ success : false,message : "User not logged in"});
        }
        next();
    }
    catch (error) {
        res .json({ success : false,message : "User not logged in"});
    }
}

export default userAuth