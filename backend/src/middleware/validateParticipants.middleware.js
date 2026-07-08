import User from "../models/User.js";

export const validateParticipants = async (req, res, next) => {
    const { participants } = req.body;

    if (!Array.isArray(participants) || participants.length < 1) {
        return res.status(400).json({ error: "participants must be a non-empty array of friend codes" });
    }

    try {
        const users = await User.find({ friendCode: { $in: participants } });

        if (users.length === 0) {
            return res.status(404).json({ error: "No matching users found for the given friend codes" });
        }

        next();
    } catch (error) {
        console.error("Error validating participants:", error);
        res.status(500).json({ error: "Failed to validate participants" });
    }
};