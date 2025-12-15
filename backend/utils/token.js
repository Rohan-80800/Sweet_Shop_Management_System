import jwt from "jsonwebtoken";

const genToken = async (user) => {
  try {
    const token = await jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );
    return token;
  } catch (error) {
    console.log("Error in generating token");
  }
};

export default genToken;
