import * as express from require('express');
import * as line from '@line/bot-sdk';
const config = {
    "channelAccessToken" : process.env.channelAccessToken,
    "channelSecret" : proess.env.channelSecret
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

app.listen(3000);