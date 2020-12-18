$(document).ready(function(){
    $('.delete-article').on('click',function(e){
        // $(target) = $(e.target);
        // console.log($target.attr('data-id'));
        const id= e.target.getAttribute('data-id');
        $.ajax({
            type:'DELETE',
            url:'/articles/'+id,
            success: function(response){
                alert('Deleting article');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});
$(document).ready(function(){
    $('.frnd-btn').on('click',function(e){
        // $(target) = $(e.target);
        // console.log($target.attr('data-id'));
        const id= document.getElementById('frnd').getAttribute('frnd_id');
        $.ajax({
            type:'PUT',
            url:'/users/'+id,
            success: function(response){
                alert('Friend request sent');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});



function validateArticle(){
    var valid=true;
    document.getElementById("ititle").style.visibility="hidden";
    document.getElementById("ibody").style.visibility="hidden";
    var title=document.getElementById('title');
    var body=document.getElementById('body');

    title.style.borderColor='#b8b8ba';
    body.style.borderColor='#b8b8ba';

     if(title.value.trim()==""){
         title.style.borderColor='red'
         document.getElementById("ititle").style.visibility="visible";
         valid=false;
    }
   if(body.value.trim()==""){
        body.style.border='solid 3px red'
        document.getElementById("ibody").style.visibility="visible";
        valid= false;
    }
    return valid;
}


function userRegisteration(){
    var valid=true;

    document.getElementById("iname").style.visibility="hidden";
    document.getElementById("iemail").style.visibility="hidden";
    document.getElementById("iuname").style.visibility="hidden";
    document.getElementById("istate").style.visibility="hidden";
    document.getElementById("ipwd").style.visibility="hidden";
    document.getElementById("ire_pwd").style.visibility="hidden";


    var name=document.getElementById('name');
    var email=document.getElementById('email');
    var uname=document.getElementById('uname');
    var state=document.getElementById('state');
    var pwd=document.getElementById('pwd');
    var re_pwd=document.getElementById('re_pwd');

    name.style.borderColor='#b8b8ba';
    email.style.borderColor='#b8b8ba';
    uname.style.borderColor='#b8b8ba';
    state.style.borderColor='#b8b8ba';
    pwd.style.borderColor='#b8b8ba';
    re_pwd.style.borderColor='#b8b8ba';

    var email_reg=/^([\w]+)@([a-z A-Z 0-9 -]{3,5}).([a-z]{2,5})$/;

     if(name.value.trim()==""){
         name.style.borderColor='red'
         document.getElementById("iname").style.visibility="visible";
         valid=false;
    }
    if(email.value.trim()=="" || !(email_reg.exec(email.value.trim()))){
        email.style.border='solid 3px red'
        document.getElementById("iemail").style.visibility="visible";
        valid= false;
    }
   if(uname.value.trim()==""){
        uname.style.border='solid 3px red'
        document.getElementById("iuname").style.visibility="visible";
        valid= false;
    }
    if(state.value.trim()==""){
        state.style.border='solid 3px red'
        document.getElementById("istate").style.visibility="visible";
        valid= false;
    }
    if(pwd.value.trim()==""){
        pwd.style.border='solid 3px red'
        document.getElementById("ipwd").style.visibility="visible";
        valid= false;
    }
    if(re_pwd.value!=pwd.value){
        re_pwd.style.border='solid 3px red'
        document.getElementById("ire_pwd").style.visibility="visible";
        valid= false;
    }
    return valid;
}
function showTextBox(){
    var showbox= document.getElementById('showbox');
    var csection= document.getElementById('csection')

    showbox.style.visibility='hidden';
    csection.style.visibility='visible';
}
function validateComment(){
    var cbox= document.getElementById('cbox');
    if(cbox.value.trim()==""){
        document.getElementById('icbox').style.visibility='visible';
        return false;
    }
}