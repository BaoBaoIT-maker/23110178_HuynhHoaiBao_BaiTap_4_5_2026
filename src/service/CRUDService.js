import db from "../models/index.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser= async (data)=>{
    return new Promise(async (resole,reject)=>{
        try{
            let hashPasswordFromBryptjs= await hashPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBryptjs,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender ===1 ? true: false,
                roleId: data.roleId
            });
            resole("create a new user succeed!");
        }catch(e){
            reject(e);
        }
    });
    
}

let hashPassword=(password)=>{
    return new Promise(async (resole,reject)=>{
        try{
            let hash = await bcrypt.hashSync(password, salt);
            resole(hash);
        }catch(err){
            reject(err);
        }

    });
}

let getAllUser= ()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let users= await db.User.findAll({
                raw: true,
            });
            resolve(users);
        }catch(err){
            reject(err);
        }
    });
}

let getUserInfoById=(userId)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let userInfo= await db.User.findOne({
                where: {id: userId},
                raw: true
            });
            if(userInfo)
                resolve(userInfo);
            else
                resolve([]);
        }catch(err){
            reject(err);
        }
    })
}

let updateUserData= (data) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            let user= await db.User.findOne({
                where: {id: data.id}
            });
            if(user){
                user.firstName= data.firstName;
                user.lastName= data.lastName;
                user.address= data.address;
                await user.save();
                let userdata= await db.User.findAll();
                resolve(userdata);
            }else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    });
}

let deleteUserData = (userId) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            await db.User.destroy({
                where : {id: userId}
            });
            let allUser= await db.User.findAll();
            resolve(allUser);
        }catch(e){
            reject(e);
        }
    });
}

export default{
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}