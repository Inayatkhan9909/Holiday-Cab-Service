import jwt from 'jsonwebtoken';

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return !!decoded;
    } catch (error) {
        return false;
    }
};