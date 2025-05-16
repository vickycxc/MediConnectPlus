import { DataTypes } from "sequelize";
import sequelize from "../lib/db";

export const CompoundedMed = sequelize.define("compounded_med", {
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
