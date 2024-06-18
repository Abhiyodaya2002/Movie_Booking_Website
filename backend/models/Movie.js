import mongoose, { trusted } from "mongoose"

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
      type: String,
      required: true
    },
    actors: [{type: String, required: true}],
    releaseDate: {
        type: Date,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true
    },

    featured:{
        type: Boolean
    },
    bookings: [{type: mongoose.Types.ObjectId, ref: "Booking"}],
    admin:{
        type: mongoose.Types.ObjectId, //mongoose.Types.ObjectId: This indicates that each item in the addedMovies array will be a MongoDB ObjectId. An ObjectId is a unique identifier for documents in MongoDB.
        ref: "Admin", //ref: This key tells Mongoose that the ObjectIds stored in the addedMovies array are references to documents in another collection.
        required:true,
    }
});

export default mongoose.model("Movie", movieSchema);