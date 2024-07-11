const pool = require('../../config/db_connection');

const trackLinkController = async (req, res) => {
    const { tracking_id } = req.params;

    const query1 = `SELECT * FROM links WHERE tracking_id = ?`;
    try {
        const [results] = await pool.query(query1, [tracking_id]);
        if (results.length === 0) {
            res.status(404).json({ message: 'Tracking ID not found' });
        } else {
            const queryTracking = `SELECT * FROM link_tracking WHERE tracking_id = ?`;
            const [trackingResults] = await pool.query(queryTracking, [tracking_id]);
            if (trackingResults.length === 0) {
                res.status(404).json({ message: 'Link has not been opened yet' });
            } else {
                res.status(200).json(trackingResults);
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracking details' });
    }
};

module.exports = trackLinkController;
