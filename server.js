/*const express = require('express');//express is used to make and call api's easily.
const path = require('path');//managing and altering file path.
const bcrypt = require('bcrypt');//converts palin text in to hashed form for security reasons so that it becomes unreadable.
const bodyParser = require('body-parser');//parsing the requests in a middlewares 
const db = require('./config');//linking the config file here which is present in src




const app = express();//creating an express function
app.use(express.static(path.join(__dirname, '../', 'public')));//this middleware is used to connect the files in the public.path.join is used to creat e the correct path to the directory
app.set('view engine', 'ejs');//set viewengines to ejs
app.set('views', path.join(__dirname, '../', 'views'));//this sets the directory where our ejs templates are stored.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());


//const indexroute= require('./routes/adminusers');
//app.use(express().json);//this middleware is used to handle the requests from a form data.
//app.use((req,res,next) =>//its used to call the router connection here.req-request,res-response,next is the function to happen next
//{
 //   req.db=db;
   // next();
//});

//app.use('/',indexroute);//using the middle ware to call indexroute.


app.get('/', (req, res) => {//calling 'get' restful api,the parameters are ending point and (req,res).as this is the first api calling no need to keep any ending point.
    res.render('login');//render is used to generate html on the server and send it to client.here login is the name of the html page.
});



app.get('/signup', (req, res) => {//calling another 'get' restful api to signup. as its after login.parameters are /signup-endpoint and (req,res)
    res.render('signup');//render is used to generate html content on server side and send it back to client.
});



/*app.post('/login', (req, res) => {//in order to login a person has to post the values right so we use use post api here.endingpoint-login,(req,res)parameters.
    const Body = req.body;//creating a variable 'Body" and assigning it to req.body.
    const GetAdmin = 'SELECT * FROM AdminUsers WHERE EmailID = ?';//creating a variable GetAdmin and assigning a query.while login we have to see whether the email is already in DB or not so we use this select query.here ? refers to all the Email Id's in the table.
    try {//using a try block.
        db.query(GetAdmin, [Body.EmailID], (err, results) => {//calling a query function using the object declared for mysql connection.it takes 3 parameters that is getadmin(to slect whether email is present or not),body.emailid is the emailid we as a client enter and send it to server,(err,results)err-is for error and results- to store query results.
            if (err) {//if its a error
                console.error(err);//print the error
                return res.status(500).send('Internal Server Error');//send the response to the server saying that ita a internal server error.
            }
            if (results.length > 0) {//this condition says that there are results i.e there is nothing like the qury not working. 
                const hashStoredPassword = results[0].Password;//creating a variable hashSt.... so that the results are in an array...results[0].password..says that it starts from 1st password.
                console.log('Results:', results.length);//printing the length of results
                console.log('hashStoredpassword:', hashStoredPassword);//printing the hashStor....password
                bcrypt.compare(Body.Password, hashStoredPassword, (compareErr, passwordMatch) => {//as we know bcrypt is used to transform plain text in to hashtext for security reasons.here the task is to compare .its comparing body.password(the one we enter),hashStor...(the one present on server,(Compareerr),passwordmatch.in passwordmatch the resuts of the comparision is stored.)
                    if (compareErr) {//if there is any error in comparing
                        console.error(compareErr);//print the error
                        return res.status(500).send('Internal Server Error');//send the response to server with a message.
                    }
                    if (passwordMatch) {//if the passwordmatch is true ...
                        res.send('Login Successful');//give the response as stated...
                    } else {
                        res.send('Login unsuccessful');//if not give the response as stated.
                    }
                });
            } else {
                res.send('User not found');//if there are no results that is query not working ....then send the message stated....
            }//end of else
        });//end of query
    } catch (error) {//if there any errors to be caught
        console.error(error);//print the error
        res.status(500).send('Internal Server Error');//send the message to the server 
       }//end of catch
});//end of login post
*/
/*app.post('/login', (req, res) => {
    const Body = req.body;
    const GetAdmin = 'SELECT * FROM AdminUsers WHERE EmailID = ?';

    try {
        db.query(GetAdmin, [Body.EmailID], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                const storedPassword = results[0].Password;
                console.log('Stored Password:', storedPassword);
            
                if (Body.Password === storedPassword) {
                    // Passwords match, login successful
                    console.log('Login Successful');
                    res.send('Login Successful');
                } else {
                    // Passwords do not match, login unsuccessful
                    console.log('Login Unsuccessful. Passwords do not match.');
                    res.send('Login unsuccessful');
                }
            } else {
                // User not found in the database
                console.log('User not found in the database.');
                res.send('User not found');
            }
            
    });
}
     catch (error)
      {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});








app.post('/signup', (req, res) => {//in order to signup also a person has to post the values write so we use post method.
    const body = req.body;//creating body and assigning it to req.body
    const insertUser = 'INSERT INTO AdminUsers(FirstName, LastName, EmailID, Password) VALUES (?,?,?,?)';//here we are using insert because to insert the values in to db .the following attribute s are inserted 
    const hashedPassword = bcrypt.hash(body.Password, 10);//while inserting the plain password we enter ,it must be bcrypted for security reasons.here the value 10 says that number of times hashing is done.more the number o ftimes hashing is done it secure but it decreases the process.
    try {//starting try block
        const existingUserQuery = 'SELECT * FROM AdminUsers WHERE EmailID = ?'//here we are doing validation ...to check that we must see if the 
        const existingUserResult =db.query(existingUserQuery,[body.EmailID], (err, results) => {//here we are creating existinguserresult the parameters are existinguserquery,body.emailid,(err,results) 
        //const hashedPassword = bcrypt.hash(body.Password, 10);
        console.log(results,'results')//print the results
            if (results.length >0) {//if there are results i.e, the query working
                //console.log('User exists');
                return res.send('<script>window.alert("User already exists"); window.location.href="/"</script>');//send the response by alert window-used to give message on the specific window,window.location-used to send to other window and we give erserr
            }
            else if (err) {//handele the error 
                console.error('Error inserting user into the database:', err);
                res.status(500).send('Internal Server Error');
            } else {//if the query doesnot work that is email not matching then go with the registartion.
                res.send('<script>window.alert("Registration successful"); window.location.href="/"</script>');//registration successful
            }
        });
    } catch (error) {//use the catch block to catch if there is any errors.
        console.error(error);//printf the error
        res.status(500).send('Internal Server Error');//send the response to the client saying that there is internal server error.
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
*/
http.createServer(function (req, res) {
  res.write('Hello World');
  res.end();
}).listen(process.env.PORT || 5000);
