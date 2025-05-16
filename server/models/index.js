import { CompoundedMedication } from "./compunded_medication.model.js";
import { Consultation } from "./consultation.model.js";
import { Diagnosis } from "./diagnosis.model.js";
import { Doctor } from "./doctor.model.js";
import { DoctorEducation } from "./doctor_education.model.js";
import { DoctorNote } from "./doctor_note.model.js";
import { DoctorSchedule } from "./doctor_schedule.model.js";
import { Message } from "./message.model.js";
import { Notification } from "./notification.model.js";
import { Prescription } from "./prescription.model.js";
import { User } from "./user.model.js";

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

// User - Notification (1:N)
User.hasMany(Notification, {
  foreignKey: "receiver_id",
});
User.hasMany(Notification, {
  foreignKey: "sender_id",
});
Notification.belongsTo(User, {
  foreignKey: "receiver_id",
});
Notification.belongsTo(User, {
  foreignKey: "sender_id",
});

// User - Consultation (1:N)
User.hasMany(Consultation, {
  foreignKey: "patient_id",
});
Consultation.belongsTo(User, {
  foreignKey: "patient_id",
});

// Doctor - Consultation (1:N)
Doctor.hasMany(Consultation, {
  foreignKey: "doctor_id",
});
Consultation.belongsTo(Doctor, {
  foreignKey: "doctor_id",
});

// Doctor - Education (1:N)
Doctor.hasMany(DoctorEducation, {
  foreignKey: "doctor_id",
});
DoctorEducation.belongsTo(Doctor, {
  foreignKey: "doctor_id",
});

// Doctor - Doctor Schedule (1:N)
Doctor.hasMany(DoctorSchedule, {
  foreignKey: "doctor_id",
});
DoctorSchedule.belongsTo(Doctor, {
  foreignKey: "doctor_id",
});

// Consultation - Doctor Note (1:1)
Consultation.hasOne(DoctorNote, {
  foreignKey: "id",
});
DoctorNote.belongsTo(Consultation, {
  foreignKey: "id",
});

// Consultation - Prescription (1:N)
Consultation.hasMany(Prescription, {
  foreignKey: "consultation_id",
});
Prescription.belongsTo(Consultation, {
  foreignKey: "consultation_id",
});

// Consultation - Message (1:N)
Consultation.hasMany(Message, {
  foreignKey: "consultation_id",
});
Message.belongsTo(Consultation, {
  foreignKey: "consultation_id",
});

// Message - Message (1:1)
Message.hasOne(Message, {
  foreignKey: "reply_to",
  as: "reply",
});
Message.belongsTo(Message, {
  foreignKey: "reply_to",
  as: "parent_message",
});

// Doctor Note - Diagnosis (1:N)
DoctorNote.hasMany(Diagnosis, {
  foreignKey: "consultation_id",
});
Diagnosis.belongsTo(DoctorNote, {
  foreignKey: "consultation_id",
});

// Prescription - Compounded Medication (1:N)
Prescription.hasMany(CompoundedMedication, {
  foreignKey: "prescription_id",
});
CompoundedMedication.belongsTo(Prescription, {
  foreignKey: "prescription_id",
});

export {
  User,
  Doctor,
  Message,
  Notification,
  Consultation,
  Diagnosis,
  DoctorEducation,
  DoctorSchedule,
  DoctorNote,
  Prescription,
  CompoundedMedication,
};
