import mongoose from "mongoose"

const adminSchema =new mongoose.Schema({
    email:{
        type : String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    },
    addedMovies: [{
        type: mongoose.Types.ObjectId, //mongoose.Types.ObjectId: This indicates that each item in the addedMovies array will be a MongoDB ObjectId. An ObjectId is a unique identifier for documents in MongoDB.
        ref: "Movie" //ref: This key tells Mongoose that the ObjectIds stored in the addedMovies array are references to documents in another collection.
    },
],
});

export default mongoose.model("Admin", adminSchema);