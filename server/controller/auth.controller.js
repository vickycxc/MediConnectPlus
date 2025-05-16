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
    profile_picture_url,
    str_number,
    sip_number,
    specialization,
    practice_start_year,
    practice_location,
    practice_city,
    off_schedule_fee,
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

    if (newUser && role === "patient") {
      generateToken(newUser.id, res);
      return res.status(201).json({ message: "Registrasi Pasien berhasil" });
    }

    if (role === "doctor") {
      const newDoctor = await newUser.createDoctor({
        profile_picture_url,
        str_number,
        sip_number,
        specialization,
        practice_start_year,
        practice_location,
        practice_city,
        off_schedule_fee,
      });
      if (newDoctor) {
        generateToken(newUser.id, res);
        return res.status(201).json({ message: "Registrasi Dokter berhasil" });
      }
    }
  } catch (error) {
    console.error("Error di register controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
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

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("Error di logout controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      message: "Token valid",
    });
  } catch (error) {
    console.error("Error di checkAuth controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const updateProfile = async (req, res) => {
  const {
    full_name,
    email,
    password,
    birth_date,
    gender,
    phone_number,
    role,
    drug_allergies,
    profile_picture_url,
    str_number,
    sip_number,
    specialization,
    practice_start_year,
    practice_location,
    practice_city,
    off_schedule_fee,
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

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    user.full_name = full_name;
    user.email = email;
    user.password = password;
    user.birth_date = birth_date;
    user.gender = gender;
    user.phone_number = phone_number;
    user.drug_allergies = drug_allergies;

    await user.save();

    if (role === "doctor") {
      const doctor = await user.getDoctor();
      if (!doctor) {
        return res.status(404).json({ message: "Dokter tidak ditemukan" });
      }
      doctor.profile_picture_url = profile_picture_url;
      doctor.str_number = str_number;
      doctor.sip_number = sip_number;
      doctor.specialization = specialization;
      doctor.practice_start_year = practice_start_year;
      doctor.practice_location = practice_location;
      doctor.practice_city = practice_city;
      doctor.off_schedule_fee = off_schedule_fee;

      await doctor.save();

      return res.status(200).json({
        message: "Profil Dokter Berhasil Diperbarui",
      });
    } else {
      return res.status(200).json({
        message: "Profil Berhasil Diperbarui",
      });
    }
  } catch (error) {
    console.error("Error di updateProfile controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
