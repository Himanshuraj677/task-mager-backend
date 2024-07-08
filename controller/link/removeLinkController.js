const con = require('../../config/db_connection');

const removeLink = (req, res) => {
    const { id } = req.params; // Assuming ID is sent in the request body

    const query = `DELETE FROM links WHERE id = ?`;
    con.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error deleting link:', error);
            return res.status(500).json({ error: 'Failed to delete link' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.status(200).json({ message: 'Link deleted successfully' });
    });
};

module.exports = removeLink;
