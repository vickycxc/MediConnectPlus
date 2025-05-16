import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_MODEL,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Database connection/synchronization failed:", error);
  }
};
