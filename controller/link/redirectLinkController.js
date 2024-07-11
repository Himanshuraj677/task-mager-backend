const pool = require('../../config/db_connection');

const redirectLink = async (req, res) => {
    const { shortened_url } = req.params;

    const query = `SELECT * FROM links WHERE shortened_url = ?`;
    try {
        const [results] = await pool.query(query, [shortened_url]);
        if (results.length === 0) {
            res.status(404).json({ message: 'Link not found' });
        } else {
            const original_url = results[0].original_url;
            res.status(200).json({ original_url });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch link' });
    }
};

module.exports = redirectLink;
