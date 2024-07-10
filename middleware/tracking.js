const axios = require('axios');
const con = require('../config/db_connection');
const useragent = require('useragent');

const trackingMiddleware = async (req, res, next) => {
    const ipAddressRaw = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipAddress = ipAddressRaw.split(',')[0].trim();
    const userAgent = req.headers['user-agent'];
    const { shortened_url } = req.params;
    // console.log("Let track");
    let country = '';
    let city = '';
    let browser = '';
    let os = '';
    // console.log(req.body);
    let battery_status = req.body.battery_info.level || 'Unknown';

    try {
        const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        const data = response.data;
        country = data.country_name || '';
        city = data.city || '';
    } catch (error) {
        // console.error('Error fetching geolocation data:', error);
    }

    try {
        const agent = useragent.parse(userAgent);
        browser = agent.toAgent();
        os = agent.os.toString();
    } catch (error) {
        // console.error('Error parsing user agent:', error);
    }

    const query1 = `SELECT tracking_id FROM links WHERE shortened_url = ?`;
    con.query(query1, [shortened_url], (error, results) => {
        if (error) {
            return res.status(404).json({"message": "Page Not Found"});
        }
        const tracking_id = results[0].tracking_id;
        // console.log(results[0]);
        const query2 = `INSERT INTO link_tracking (tracking_id, ip_address, country, city, user_agent, browser, os, battery_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        con.query(query2, [tracking_id, ipAddress, country, city, userAgent, browser, os, battery_status], (error, results) => {
            if (error) {
                // console.error('Error inserting tracking details:', error);
            }
            next();
        });
    })
};

module.exports = trackingMiddleware;
