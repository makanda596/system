const names=document.getElementById('names')
const email=document.getElementById('email')
const password= document.getElementById('password')
const user=document.getElementById('user')
const names_error= document.getElementById('names_error')
const password1_error =document.getElementById('password1_error')
const password2=document.getElementById('password2')
const password2_error =document.getElementById('password2_error')
const user_error=document.getElementById('user_error')
const form=document.getElementById('form')

form.addEventListener('submit', (e) =>{
 var email_check = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(names.value ===''){
        e.preventDefault();
         names_error.innerHTML= "Enter your Full names"
    }
    else{
        names_error.innerHTML= ""
    }
    if(user.value === ''){
        e.preventDefault();
         user_error.innerHTML= "Enter your username"
    }   else if(user.value.length >=9){
        e.preventDefault();
        user_error.innerHTML= "username must be less than 9 characters"
    }else{
        user_error.innerHTML= ""
    }
     if(!email.value.match(email_check)){
        e.preventDefault();
        email_error.innerHTML= "Valid email is required"
    }
    else{
        email_error.innerHTML= ""
    }
    if(email.value==""){
        e.preventDefault();
        email_error.innerHTML= "Enter your email"
    }
    if(password.value.length <= 8){
         e.preventDefault();
        password_error.innerHTML= "password must be at least 8 characters"
        
    } else{
          password_error.innerHTML= ""
    }
    if(password.value.length >= 20){
        e.preventDefault();
        password_error.innerHTML="password must be less than 20 characters"
    }
    if(password.value==""){
        e.preventDefault();
        password_error.innerHTML= "Enter your password"
    }
 
   
})