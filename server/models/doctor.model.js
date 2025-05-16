import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export const Doctor = sequelize.define(
  "doctor",
  {
    profile_picture_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    str_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sip_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.ENUM(
        "dokter_umum",
        "spesialis_mata",
        "spesialis_anak",
        "spesialis_kulit",
        "spesialis_tht",
        "spesialis_kandungan",
        "psikiater",
        "spesialis_paru",
        "spesialis_penyakit_dalam",
        "psikolog_klinis",
        "dokter_hewan",
        "dokter_gigi",
        "spesialis_saraf",
        "spesialis_andrologi",
        "spesialis_gizi",
        "spesialis_bedah",
        "spesialis_jantung",
        "spesialis_rehabilitasi_medik"
      ),
      allowNull: false,
    },
    practice_start_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    practice_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    practice_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    off_schedule_fee: {
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
