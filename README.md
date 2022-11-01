# Backend_task Documentation

API : https://companybackendtask.herokuapp.com

<h3 >Routes</h3>

<h3>Route 1 (CRUD:post) : `/signup` - User registration can be done.</h3>
<strong>request schema</strong> : firstname (type : string), lastname (type:string) , email (type:string),password (type:string) ,address(type : string). 
<strong>response schema</strong> : status(200)--> "User Registered" / status(500) --> "error".

<img width="640" alt="image" src="https://user-images.githubusercontent.com/103260485/199243728-0d1d13d3-042f-4ae0-b969-62f96cf8d2f3.png">


<h3>Route 2 (CRUD:post): `/signin` - User login.</h3>
<strong>request schema</strong> : email (type:string) , password (type:string) 
<strong>response schema</strong> : status(200)--> message:"Successfully logged in",userid:(type:user object id),token:token ,email:user email / status(500) --> "error".

<img width="646" alt="image" src="https://user-images.githubusercontent.com/103260485/199244142-55b80f45-b10f-4a31-b013-a2dd83a5ad99.png">



<h3>Route 3 (CRUD:put): `/forgotpassword` - Change password for a user , it generates random password and sends to user emailid.</h3>
<strong>request schema</strong> : email (type:string)  
<strong>response schema</strong> : status(200)-->"Password Successfully changed" / status(500) --> "error".

<img width="644" alt="image" src="https://user-images.githubusercontent.com/103260485/199245241-c47902b1-603b-4a26-9c6d-3bb6db4936bb.png">
<img width="298" alt="image" src="https://user-images.githubusercontent.com/103260485/199245753-7559811e-7cc4-477b-8ff5-4d5921ae88a7.png">



<h3>Route 4 (CRUD:post): `/mailsend` - Send mail to any email </h3>
<strong>request schema</strong> : email (type:string) , message (type:string) , subject (type:string) 
<strong>response schema</strong> : status(200)-->"Mail sent" / status(500) --> "error".

<img width="639" alt="image" src="https://user-images.githubusercontent.com/103260485/199246743-67f208f0-2403-4b1c-91d3-73873e7b9a8c.png">

<img width="715" alt="image" src="https://user-images.githubusercontent.com/103260485/199246951-b4cd884f-ff6e-4817-ab63-4f09815b2935.png">



