const con = require('../../config/db_connection');

const trackLinkController = async (req, res) => {
    const { tracking_id } = req.params;
    // console.log(tracking_id);
    const query1 = `SELECT * FROM links WHERE tracking_id = ?`;
    con.query(query1, [tracking_id], (error, results) => {
        if (error) {
            // console.error('Error fetching tracking details:', error);
            return res.status(500).json({ error: 'Failed to fetch tracking details' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Tracking ID not found' });
        }

        const queryTracking = `SELECT * FROM link_tracking WHERE tracking_id = ?`;
        con.query(queryTracking, [tracking_id], (error, trackingResults) => {
            if (error) {
                // console.error('Error fetching tracking details:', error);
                return res.status(500).json({ error: 'Failed to fetch tracking details' });
            }
            if (trackingResults.length === 0) {
                return res.status(404).json({ message: 'Link has not opened yet' });
            }
            return res.status(200).json(trackingResults);
        });
    });
};

module.exports = trackLinkController;
