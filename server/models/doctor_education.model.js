import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const DoctorEducation = sequelize.define(
  "doctor_education",
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education_level: {
      type: DataTypes.ENUM(
        "sarjana",
        "profesi",
        "spesialis",
        "subspesialis",
        "magister",
        "doktor"
      ),
      allowNull: false,
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
