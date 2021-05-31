const express = require('express');
const app = express();

/* websocket*/
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server);

const nunjucks = require('nunjucks');

app.use(express.static('node_modules/socket.io/client-dist'));
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.get('/',(req,res)=>{
    res.render('index');
});

//addEvnetListner('',)
io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`MESSAGE ${data.msg}`);
        socket.broadcast.emit('call',data.msg);
    })
});

server.listen(3000,()=>{
    console.log('start 3000')
})