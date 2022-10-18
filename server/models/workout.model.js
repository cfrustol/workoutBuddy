const mongoose = require('mongoose');
const WorkoutSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [ true, "Please include the name of the workout" ],
    },
    difficulty: { 
        type: String,
        required: [ true, "Please select the type of difficulty"],
    },
    goal: { 
        type: String,
        required: [ true, "Please select a goal type"],
    },
    sets: { 
        type: Number,
        required: [ true, "Please include number of sets"],
    },
    reps: { 
        type: Number,
        required: [ true, "Please include number of reps"],
    },
    description: { 
        type: String,
        required: [ true, "Please include a description"],
    },
    instruction: { 
        type: String,
        required: [ true, "Please include instructions"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
module.exports = mongoose.model('Workout', WorkoutSchema);

