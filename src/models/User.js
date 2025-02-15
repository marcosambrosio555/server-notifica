import mongoose from 'mongoose'

const User = mongoose.model("users", {
    username: String,
    phone: String,
    date: {
        type: String,
        default: new Date().toLocaleString()
    }
})

export default User;