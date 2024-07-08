const con = require('../../config/db_connection');

// Controller to handle redirection
const redirectLink = (req, res, next) => {
    const { shortened_url } = req.params;
    
    const query = `SELECT original_url FROM links WHERE shortened_url = ?`;
    con.query(query, [shortened_url], (error, results) => {
        if (error) {
            console.error('Error fetching link:', error);
            return res.status(500).json({ error: 'Failed to fetch link' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }

        const original_url = results[0].original_url;
        // res.redirect(original_url);
        res.status(200).json({message: `Original Url is: ${original_url}`});
    });
};

module.exports = { redirectLink };