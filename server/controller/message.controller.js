import { Op } from "sequelize";
import { Message } from "../models/index.js";
import cloudinary from "../lib/cloudinary.js";

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { id: userId } = req.user;

    const messages = await Message.findAll({
      where: {
        receiver_id: { [Op.or]: [userId, userToChatId] },
        sender_id: { [Op.or]: [user.id, userToChatId] },
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error di getMessages controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const {
      consultation_id: consultationId,
      message,
      image,
      reply_to: replyTo,
      message_type: messageType,
      message_id: messageId,
    } = req.body;
    const { id: senderId } = req.user;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = Message.create({
      consultation_id: consultationId,
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      image: imageUrl,
      reply_to: replyTo,
      message_type: messageType,
      message_id: messageId,
    });

    res.status(200).json({
      message: "Pesan berhasil dikirim",
    });
  } catch (error) {
    console.log("Error di sendMessage controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
