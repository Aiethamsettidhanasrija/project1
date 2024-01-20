class usercontroller{//define a class
    static async index1(req,res)// define a method use async function because there are other queries also there.using this makes to await for the execution of specific query.
    {//start of asyn index1
        try{//using atry-catch block to handle any errors
            const results= await query("SELECT * FROM AdminUsers");//store results of query by cretaing results variable.
            console.log("Data read...");//print 
            res.json(results)//usinng json print the results.

        }
        catch(error)//to catch the errors
        {
            console.log("Error",error);//print the error
            //console.log({Error:'Internal Server Error'});
            res.status(500).json({Error:'Internal Server Error'});//send the response to server

        }
    }
    static async index2(req,res)//same thing stated as above index1 function
    {
        try
        {
            const results=await query("INSERT INTO AdminUsers VALUES('7','aaaa','bbbb','aabb@gmail.com','1','1234567890','2024-01-12 11:55:26','2024-01-12 11:56:34','0')");
            console.log("Data Created....");
            res.json(results);
        }
        catch(error)
        {
            console.log("Error",error);
            res.status(500).json({Error:'Internal Sever Error'});
        }

    }
    static async index3(req,res)//same thing stated as above index1 function
    {
        try{
            const results=await query("UPDATE AdminUsers SET LastName='cccc' where MobileNumber='12345567890'");
            console.log("Data Updated");
            res.json(results);
        }
        catch(error)
        {
            console.log('Error:',error);
            res.status(500).json({Error:'Internal Server Error'});
        }
    }
    static async index4(req,res)//same thing stated as above index1 function
    {
         try {
            const results=await query("DELETE FROM AdminUsers WHERE FirstName='aaaa'");
         } catch (error) 
         {
            console.log('Error',error);
            res.status(500).json({Error:'Internal Server Error'});
         }
    }
}
module.exports=usercontroller;//in order to link to main file we need to export it first so that the other one imports it.