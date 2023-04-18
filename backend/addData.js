
const { Kafka, Partitioners } = require('kafkajs')
const { Server } = require('socket.io')


const kafka = new Kafka({
    clientId: 'testTopic',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'my-group' })



exports.addData = async (req, res) => {
    try {
        await producer.send({
            topic: 'testTopic',
            messages: [
                { value: req.body.message }
            ]
        })
        return res.json({ success: true, message: 'Sent successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}

let socketer = ""

exports.createSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin:'*'
        },
    })
    socketer = io
}

exports.subscribe = async () => {
    await producer.connect()
    await consumer.connect()
    await consumer.subscribe({topic: 'testTopic', fromBeginning: true})

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            this.socketEmitter(message.value.toString())
        }
    })
}

exports.socketEmitter = async (data) => {
    try {
        socketer.emit('message', data)
    } catch (error) {
        console.log(error)
    }
}
