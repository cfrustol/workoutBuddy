const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: [ true, "First name is required" ],
    },
    lastName: { 
        type: String,
        required: [ true, "Last name is required"],
    },
    email: { 
        type: String,
        unique: [true, "Email is already being used"],
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        required: [ true, "Email is required"],
    },
    password: { 
        type: String,
        required: [ true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    workout: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }]
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) =>{
        this._confirmPassword = value
    });

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match")
    }
    next();
});

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10)
    .then((hash)=>{
        this.password=hash;
        next();
    })
    .catch(err =>{
        console.log("error saving hash")
        console.log(err)
    })
});

module.exports = mongoose.model('User', UserSchema);
