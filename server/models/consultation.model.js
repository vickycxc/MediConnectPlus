import { DataTypes } from "sequelize";

export const Consultation = sequelize.define(
  "consultation",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    next_consultation: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "scheduled", "canceled"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
