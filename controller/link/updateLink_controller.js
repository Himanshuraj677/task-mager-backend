const con = require('../../config/db_connection');

const updateLink = (req, res) => {
    const { id } = req.params;
    const { original_url } = req.body;

    const query = `UPDATE links SET original_url = ?, updatedAt = NOW() WHERE id = ?`;
    con.query(query, [original_url, id], (error, results) => {
        if (error) {
            console.error('Error updating link:', error);
            return res.status(500).json({ error: 'Failed to update link' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.status(200).json({ message: 'Link updated successfully' });
    });
};

module.exports = updateLink;