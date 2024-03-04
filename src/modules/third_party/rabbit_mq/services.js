const amqp = require("amqplib");

const queue = "update_account";

const text = {
  item_id: "macbook",
  text: "This is a sample message to send receiver to check the ordered Item Availablility",
};

exports.sendLog = async ({
    data
}) => {
    let connection;
    
    try {
        connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
    
        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        console.log("Data sended!");
        await channel.close();
    
    } catch (err) {
        throw(err);
    
    } finally {
        if (connection) await connection.close();
    }
};