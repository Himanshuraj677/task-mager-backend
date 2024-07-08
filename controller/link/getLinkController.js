const con = require('../../config/db_connection');

const getLink = (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM links WHERE id = ?`;
    con.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error fetching link:', error);
            return res.status(500).json({ error: 'Failed to fetch link' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.status(200).json(results[0]);
    });
};

module.exports = getLink;