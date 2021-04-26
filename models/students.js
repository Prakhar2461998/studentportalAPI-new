const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');

const studentSchema= new mongoose.Schema({

   

  
    ProspectID:{
        type:String,
        required:true,
        unique:true
},
   

    Firstname:{
        type:String,
        required:true,
        minlength:3
    },
    Lastname:{
        type:String,
        required:true,
        minlength:3
    },
    mx_Instalment_1_Due_date:{
        type:String,
        required:false,
    },
    mx_Instalment_2_Due_date:{
        type:String,
        required:false,
    },  
    mx_Instalment_3_Due_date:{
        type:String,
        required:false,
    },  
    mx_Instalment_4_Due_date:{
        type:String,
        required:false,
    },
    mx_Instalment_5_Due_date:{
        type:String,
        required:false,
    },
    mx_Installment_1_Amount:{
        type:String,
        required:false,
    },
    mx_Installment_2_Amount:{
        type:String,
        required:false,
    },
    mx_Installment_3_Amount:{
        type:String,
        required:false,
    },
    mx_Installment_4_Amount:{
        type:String,
        required:false,
    },
    mx_Installment_5_Amount:{
        type:String,
        required:false,
    },


    EmailAddress:{
        type:String,
        required:true,
        unique:[true,"Email Already present"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid Email")
            }
        } 
    },
    Phone:{
        type:Number,
        required:true,
        unique:[true],
        min:10
    },
   

   mx_lmsid:{
       type:Number,
       required:true,
       unique:[true]
   },
  password:{
      type:String,
      required:true,
      
  },
  accesstoken:{
      type:String,
      required:false,

  }
})

const Student= new mongoose.model("Student", studentSchema);
studentSchema.methods.generateAuthToken = async function(){
  try{
    Student=this
    const accesstoken=jwt.sign({_id:this._id.toString()},"12345678901234567890123456789012");
         console.log(accesstoken ,"Accesstoken");
         await this.save();
         return accesstoken;
  }
  catch (error){
       res.send("Errror", + error);
       console.log("Errror", + error);
  }
}

module.exports = Student;
