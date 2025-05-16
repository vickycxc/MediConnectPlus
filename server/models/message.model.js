import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export const Message = sequelize.define(
  "message",
  {
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consultation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reply_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    message_type: {
      type: DataTypes.ENUM(
        "message",
        "consultation_time",
        "doctor_note",
        "prescription"
      ),
      allowNull: false,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
