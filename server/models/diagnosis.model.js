import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export const Diagnosis = sequelize.define(
  "diagnosis",
  {
    consultation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diagnosis_type: {
      type: DataTypes.ENUM(
        "primary_diagnosis",
        "secondary_diagnosis",
        "additional_diagnosis"
      ),
      allowNull: false,
    },
    is_provosional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "diagnoses",
    freezeTableName: true,
  }
);
