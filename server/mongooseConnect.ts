const mongoose = require("mongoose").set("debug", true);
const connection: any = {};

const connectDatabase = async () => {
    if (connection.isConnected) {
        // Using existing database connection
        return;
    }

    // Using new database connection
    const options = {};
    const db = mongoose.connect("mongodb://VntechZ:gscore@ds149144.mlab.com:49144/startupapp", options);
    

    // connection.isConnected = db.connections[0].readyState;
};

export default connectDatabase