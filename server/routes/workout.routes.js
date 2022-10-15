const WorkoutController = require('../controllers/workout.controller');
module.exports = (app) => {
    app.post('/api/workouts', WorkoutController.addNewWorkout);
    app.get('/api/workouts', WorkoutController.getAllForLoginUser);
    app.get('/api/workouts', WorkoutController.getAll);
    app.get('/api/workouts/:id', WorkoutController.getOne);
    app.put('/api/workouts/:id', WorkoutController.update);
    app.delete('/api/workouts/:id', WorkoutController.delete);
}

