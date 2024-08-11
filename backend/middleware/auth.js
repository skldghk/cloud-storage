const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            throw new Error();
        }

        req.user = user;  // 로그인한 사용자 정보를 req.user에 할당
        next();
    } catch (error) {
        res.status(401).send({ error: '인증이 필요합니다.' });
    }
};

module.exports = auth;
