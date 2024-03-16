import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

const userSchema = new mongoose.Schema({
    //required: true means email is compulsory
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true }, 
});

// here we have encrypted the password before saving in to the database. It's a middleware
userSchema.pre("save", async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
} );

const User = mongoose.model<UserType>("User", userSchema);

export default User;

