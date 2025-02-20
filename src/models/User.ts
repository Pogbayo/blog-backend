import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    comparePassword:(enteredPassword:string)=>Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

//Hashing the password before usage
UserSchema.pre<IUser>("save",async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.comparePassword = async function (enteredPassword:string){
    return bcrypt.compare(enteredPassword,this.password);
};

export const User = mongoose.model<IUser>("User",UserSchema);
// export default User;