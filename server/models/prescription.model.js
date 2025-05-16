import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const Prescription = sequelize.define(
  "prescription",
  {
    consultation_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_compounded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compounding_method: {
      type: DataTypes.ENUM("injeksi", "kapsul", "puyer", "salep", "sirup"),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
