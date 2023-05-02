const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const getUser = (userId) => {

    for (let i = 0; i < users.length; i++) {
        if (userId == users[i].userId) {
            console.log(userId)

            return users[i]
        }
    }
    return null;
}
io.on('connection', (socket) => {
    //when connect
    console.log('a user connected')
    // console.log(users)
    //take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })
    //send and get message
    socket.on("sendMessage", (message) => {
        // console.log(text, senderId, receiverId)
        const user = getUser(message.receiverId)
        console.log(message)
        console.log(users)
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }

    })

    //when disconnect
    socket.on('disconnect', () => {
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})
