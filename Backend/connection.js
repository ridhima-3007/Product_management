const mongoose=require('mongoose');

async function CreateConnection(url){
    await mongoose.connect(url).then(()=>{
        console.log("Database Connected");
    })
}

module.exports=CreateConnection;