const WorkoutController = require('../controllers/workout.controller');
module.exports = (app) => {
    app.post('/api/workouts', WorkoutController.addNewWorkout);
    app.get('/api/workouts', WorkoutController.getAllForLoginUser);
    app.post('/api/workouts/create', WorkoutController.create);
    app.get('/api/workouts/all', WorkoutController.getAll);
    app.get('/api/workouts/:id', WorkoutController.getOne);
    app.put('/api/workouts/:id', WorkoutController.update);
    app.delete('/api/workouts/:id', WorkoutController.delete);
}

