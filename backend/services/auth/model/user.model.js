import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        unique: true
    },
    username: string,
    email: string,
    avatar: string
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User;