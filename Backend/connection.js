const mongoose=require('mongoose');

async function CreateConnection(url){
    return await mongoose.connect(url)
}

module.exports=CreateConnection;