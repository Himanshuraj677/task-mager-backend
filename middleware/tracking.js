const axios = require('axios');
const pool = require('../config/db_connection');
const useragent = require('useragent');

const trackingMiddleware = async (req, res, next) => {
    const ipAddressRaw = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipAddress = ipAddressRaw.split(',')[0].trim();
    const userAgent = req.headers['user-agent'];
    const { shortened_url } = req.params;

    let country = '';
    let city = '';
    let browser = '';
    let os = '';
    let battery_status = req.body.battery_info.level || 'Unknown';

    try {
        const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        const data = response.data;
        country = data.country_name || '';
        city = data.city || '';
    } catch (error) {
        // Error handling
    }

    try {
        const agent = useragent.parse(userAgent);
        browser = agent.toAgent();
        os = agent.os.toString();
    } catch (error) {
        // Error handling
    }

    const query1 = `SELECT tracking_id FROM links WHERE shortened_url = ?`;
    try {
        const [results] = await pool.query(query1, [shortened_url]);
        if (results.length === 0) {
            res.status(404).json({ "message": "Page Not Found" });
        } else {
            const tracking_id = results[0].tracking_id;
            const query2 = `INSERT INTO link_tracking (tracking_id, ip_address, country, city, user_agent, browser, os, battery_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            await pool.query(query2, [tracking_id, ipAddress, country, city, userAgent, browser, os, battery_status]);
            next();
        }
    } catch (error) {
        // Error handling
    }
};

module.exports = trackingMiddleware;
