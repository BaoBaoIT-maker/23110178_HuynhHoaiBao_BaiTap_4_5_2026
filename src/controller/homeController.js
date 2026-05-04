import db from "../models/index.js";
import CRUDService from "../service/CRUDService.js"

let getHomePage= async (req,res)=>{
    try{
        let data = await db.User.findAll();
        return res.render("homePage.ejs",{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send('Internal Server Error');
    }
    
}
let getCRUD= (req,res)=>{
    try{
        return res.render("crud.ejs");
    }catch(err){
        return res.status(500).send('Internal Server Error');
    }
}

let postCRUD= async (req,res)=>{
    try{
        let message = await CRUDService.createNewUser(req.body);
        console.log(message);
        return res.send("post");
    }
    catch(err){
        return res.status(500).send("Internal Server Error");
    }
}

let readCRUD= async (req,res)=>{
    let data = await CRUDService.getAllUser();
    return res.render("display-CRUD.ejs",{
        dataTable: data
    });
}

let editCRUD= async (req,res)=>{
    let userId= req.query.id;
    if(userId){
        let userData= await CRUDService.getUserInfoById(userId);
        return res.render("editCRUD.ejs",{
            user: userData
        });
    }
    else{
        return res.send("Not found a User");
    }
    
}

let putCRUD= async (req,res)=>{
    let data= req.body;
    let userData= await CRUDService.updateUserData(data);
    return res.render("display-CRUD.ejs",{
        dataTable: userData
    });
}

let deleteCRUD = async (req,res)=>{
    let userId= req.query.id;
    let userData= await CRUDService.deleteUserData(userId);
    return res.render("display-CRUD.ejs",{
        dataTable: userData
    });
}

export default {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}