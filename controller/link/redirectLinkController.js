const con = require('../../config/db_connection');

const redirectLink = async (req, res) => {
    const { shortened_url } = req.params;
    // console.log("Received request for shortened_url:", shortened_url);

    const query = `SELECT * FROM links WHERE shortened_url = ?`;
    con.query(query, [shortened_url], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch link' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Link not found' });
        }

        const original_url = results[0].original_url;
        // console.log(`${original_url}`)
        res.status(200).json({original_url});
        // res.redirect(original_url);
    });
};


module.exports = redirectLink;