import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);


export const pushNotification = functions.https.onRequest((request, response) => {

    console.log('Push notification event triggered');

    // const token = request.query.token;
    const id = request.query.id;
    const tipo = request.query.topico;

    let payload = {};

    if (tipo === 'delivery') {
        payload = {
            notification: {
                title: 'Nueva compra!!!',
                body: 'Revisa tu bandeja de ordenes'
            }
        }
    }

    if (tipo === 'tienda') {
        payload = {
            notification: {
                title: 'Nueva compra',
                body: 'Revisa tu bandeja de compras'
            }
        }
    }


    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    admin.messaging().sendToTopic(id, payload, options)
        .then(() => response.send("OK"))
        .catch(() => response.send("FAIL"));

});
