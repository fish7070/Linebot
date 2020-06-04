const express = require('express');
const line = require('@line/bot-sdk');
const config = {
    "channelAccessToken": process.env.Channelaccesstoken,
    "channelSecret": process.env.Channelsecret
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

app.listen(process.env.PORT || 80);