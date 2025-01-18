import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Authentication required" 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded.Id) {
                return res.status(401).json({ 
                    success: false,
                    message: "Invalid authentication token" 
                });
            }
            
            req.body.userId = decoded.Id;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ 
                    success: false,
                    message: "Token expired" 
                });
            }
            throw error;
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ 
            success: false,
            message: "Authentication error" 
        });
    }
};

export default userAuth;