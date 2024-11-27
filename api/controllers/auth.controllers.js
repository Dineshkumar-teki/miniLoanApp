import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  console.log(username, password, email);

  if (!username || !password || !email) {
    res.status(400).send("required all fields");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await newUser.save();
    res.status(200).json("signup successfull");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  const { password, email, role } = req.body;

  if (!password || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (validUser && role === "admin" && validUser.role !== "admin" ) {
      return res
        .status(400)
        .json({ message: "You are not allowed to sign in as an admin." });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password!" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_TOKEN);
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("accessToken", token, { httpOnly: true })
      .json({ rest, token });
  } catch (error) {
    console.log(error);
  }
};
