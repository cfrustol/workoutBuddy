const Workout = require('../models/workout.model');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const addNewWorkout = async (req, res) => {
    const { body } = req;
    let newWorkout = new Workout(body);
    console.log(newWorkout);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true});
    console.log("TOKEN", decodedJwt);
    console.log("ID: ", decodedJwt.payload.id);
    newWorkout.user_id = decodedJwt.payload.id;
    console.log('new workout added id', newWorkout)
    try {
        newWorkout = await newWorkout.save();
        res.json(newWorkout);
        return;
    } catch (error) {
        console.log("error", error);
        res.status(400).json(error);
    }
}

module.exports = {
    addNewWorkout,
}

module.exports.getAllForLoginUser = (req, response) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true});
    Workout.find({user_id: decodedJwt.payload.id})
        .then(workouts => {
            console.log(workouts);
            response.json(workouts);
        })
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.getAll = (request, response) => {
    Workout.find({})
        .then(workouts => {
            console.log(workouts);
            response.json(workouts);
        })
        .catch((err) => {
            res.status(400).json({ err });
    });
}
module.exports.create = (request, response) => {
    Workout.create(request.body)
        .then(workout => {
            console.log(workout);
            response.json(workout);
        })
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.getOne = (request, response) => {
    Workout.findOne({_id:request.params.id})
        .then(workout => response.json(workout))
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.update = (request, response) => {
    Workout.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
        .then(updated => response.json(updated))
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.delete = (request, response) => {
    Workout.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch((err) => {
            res.status(400).json({ err });
    });
}
