import bcryptjs from "bcryptjs";
import { User } from "../models/index.js";
import { generateToken } from "../lib/jwt.js";

export const register = async (req, res) => {
  const {
    full_name,
    email,
    password,
    birth_date,
    gender,
    phone_number,
    role,
    drug_allergies,
  } = req.body;
  try {
    if (
      !full_name ||
      !email ||
      !password ||
      !birth_date ||
      !gender ||
      !phone_number ||
      !role
    ) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password harus lebih dari 6 karakter" });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      birth_date,
      gender,
      phone_number,
      role,
      drug_allergies,
    });

    if (newUser) {
      generateToken(newUser.id, res);
      return res.status(201).json({ message: "Registrasi berhasil" });
    }
  } catch (error) {}
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Email tidak valid" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password tidak valid" });
    }

    generateToken(user.id, res);

    return res.status(200).json({
      message: "Login berhasil",
    });
  } catch (error) {
    console.error("Error di login controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const logout = async (req, res) => {};

export const checkAuth = async (req, res) => {};

export const updateProfile = async (req, res) => {};
