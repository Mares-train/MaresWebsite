import jwt from 'jsonwebtoken';


const auth = async (req, res, next) => {
    const secret = "app";
    try {
        const token = req?.body?.headers?.Authorization || req?.headers?.authorization;
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;//ارجع له لو فيه ايرور
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;//ارجع له لو فيه ايرور
        }
        console.log(req.userId);
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(403).json({ message: "تم رفض الإذن" });
    }
}
export default auth;








