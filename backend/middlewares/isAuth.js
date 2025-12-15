import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  console.log();
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };
    next();
  } catch  {
    return res.status(401).json({ message: "Please Login Once" });
  }
};

export default isAuth;
