const express       = require('express');
const cors          = require('cors');
const functions     = require('firebase-functions');
const admin         = require('firebase-admin');
const bodyParser    = require('body-parser');

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({origin : true}));
app.use(bodyParser())
app.post('/to', (req, res) => {
    const token = req.body.token;
    const body = req.body.message;
    const title = req.body.title;
    const data = req.body.data||{};
    const payload = {
        notification : {
            title,body
        },
        data : data,
    };
    const sended = admin.messaging().sendToDevice(token, payload)
        .then(reponse => {
            return res.send({ message : "sended!", token })
        })
        .catch(response => {
            return res.send({ message : "error!", data : response, token, payload })
        });
});

exports.sendPushNotification = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });