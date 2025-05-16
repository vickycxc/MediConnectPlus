import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export const CompoundedMedication = sequelize.define("compounded_medication", {
  prescription_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
