import { Doctor } from "./doctor.model";
import { User } from "./user.model";

// User - Doctor (1:1)
User.hasOne(Doctor, {
  foreignKey: "id",
});
Doctor.belongsTo(User, {
  foreignKey: "id",
});

// User - Message (1:N)
User.hasMany(Message, {
  foreignKey: "sender_id",
});
User.hasMany(Message, {
  foreignKey: "receiver_id",
});
Message.belongsTo(User, {
  foreignKey: "sender_id",
});
Message.belongsTo(User, {
  foreignKey: "receiver_id",
});

export { User, Doctor, Message };
