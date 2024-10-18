const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const config = require("../config/config");


const PORT_SEVER = config.SERVER_PORT || 80

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

// Construct an absolute path to the 'client/build' directory
const clientBuildPath = path.join(__dirname,'..', 'client', 'build');

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(clientBuildPath)))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(clientBuildPath, 'index.html'))
    })
}

async function start() {
    try {
        console.log('[CONFIG_MONGO]:', config.MONGO_URI)
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT_SEVER, () => {
            console.log(`Server is running on port: ${PORT_SEVER}`);
        });

    } catch (e) {
        console.log('Server Error:', e.message)
        process.exit(1)
    }
}

start()

