const con = require('../../config/db_connection');

const getAllLink = (req, res) => {
    const query = `SELECT * FROM links`;

    con.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching links:', error);
            return res.status(500).json({ error: 'Failed to fetch links' });
        }
        res.status(200).json(results);
    });
};

module.exports = getAllLink;