const pool = require("../../config/db_connection");
const ShortUniqueId = require('short-unique-id');

const createLink = async (req, res, next) => {
    let { original_url, userId, shortened_url } = req.body;

    const uid = new ShortUniqueId();
    const user_id = userId || process.env.DEFAULT_USER_ID;
    const trackingId = uid.randomUUID(10);

    const checkAndInsertLink = async () => {
        if (!shortened_url) {
            shortened_url = uid.randomUUID(6);
        }

        const insertQuery = `INSERT INTO links (user_id, original_url, shortened_url, tracking_id) VALUES (?, ?, ?, ?)`;
        try {
            await pool.query(insertQuery, [user_id, original_url, shortened_url, trackingId]);
            res.status(201).json({ shortened_url: `https://qct.netlify.app/${shortened_url}`, trackingId });
        } catch (error) {
            console.error('Error inserting link:', error);
            res.status(500).json({ error: 'Internal server error 1' });
        }
    };

    if (shortened_url) {
        const checkQuery = `SELECT * FROM links WHERE shortened_url = ?`;
        try {
            const [results] = await pool.query(checkQuery, [shortened_url]);
            if (results.length !== 0) {
                res.status(409).json({ message: "Link already exists" });
            } else {
                checkAndInsertLink();
            }
        } catch (error) {
            console.error('Error checking link:', error);
            res.status(500).json({ error: 'Internal Server error 2' });
        }
    } else {
        checkAndInsertLink();
    }
};

module.exports = createLink;
