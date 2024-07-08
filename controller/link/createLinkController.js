const con = require("../../config/db_connection");
const ShortUniqueId = require('short-unique-id');

const createLink = (req, res, next) => {
    let { original_url, userId, shortened_url } = req.body;

    const uid = new ShortUniqueId(); // instantiate without options here
    const user_id = userId || process.env.DEFAULT_USER_ID;

    const checkAndInsertLink = () => {
        if (!shortened_url) {
            // Generate a unique ID
            shortened_url = uid.randomUUID(6); // Use the randomUUID method to generate a 6-character ID
        }

        const insertQuery = `INSERT INTO links (user_id, original_url, shortened_url) VALUES (?, ?, ?)`;
        con.query(insertQuery, [user_id, original_url, shortened_url], (error, results) => {
            if (error) {
                console.error('Error inserting link:', error);
                return res.status(500).json({ error: 'Failed to create link' });
            }
            return res.status(201).json({ shortened_url: `http://localhost:5000/${shortened_url}` });
        });
    };

    if (shortened_url) {
        const checkQuery = `SELECT * FROM links WHERE shortened_url = ?`;
        con.query(checkQuery, [shortened_url], (error, results) => {
            if (error) {
                console.error('Error checking link:', error);
                return res.status(500).json({ error: 'Failed to create link' });
            }
            if (results.length !== 0) {
                return res.status(409).json({ message: "Link already exists" });
            } else {
                checkAndInsertLink();
            }
        });
    } else {
        checkAndInsertLink();
    }
};

module.exports = createLink;
