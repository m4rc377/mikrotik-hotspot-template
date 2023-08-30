/*
 * # Mikrotik Template OriMod
 * https://github.com/m4rc377
 * 
 *
 * Copyright 2023 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

/* All Config */
var cookietime = 7; // this in day
var info = 'Hubungi pengelola jaringan untuk melakukan ujicoba pada jaringan ini.';

    document.login.username.focus();

    var infologin = document.getElementById('infologin');

    var username = document.login.username;
    var password = document.login.password;
    //var passwordBlock = document.login.passwordBlock;
    var passwordBlock = document.getElementById('passwordBlock');

    username.placeholder = "Kode Voucher";

    // set password = username
    function setpass() {
        var user = username.value;
    //    user = user.toLowerCase();
        username.value = user;
        password.value = user;
    }

    username.onkeyup = setpass;

    // change to voucher mode
    function voucher() {
        console.log("- Entering Voucher Mode");
        setCookie('defaultform','voucher',cookietime); 

        username.focus();
        username.onkeyup = setpass();
        username.placeholder = "Voucher Code";
        username.style = "border-radius:3px;";
        password.type = "hidden";
        passwordBlock.style = "display: none;";
        infologin.innerHTML = "Masukkan Kode Voucher<br>kemudian klik login.";
    }

    // change to member mode
    function member() {
        console.log("- Entering Member Mode");
        setCookie('defaultform','member',cookietime); 

       // username.focus();

        username.onkeyup = "";
        username.placeholder = "Username";
        username.style = "border-radius:3px 3px 0px 0px;";
        password.type = "password";
        passwordBlock.style = null;
        infologin.innerHTML = "Masukkan Username dan Password<br>kemudian klik login.";
    }

    function info() {
        alert(info);
    }

    function trial() {
        console.log("Trial Form");
        if (triallink) {
            console.log(triallink);
            var gotrial = htmlDecode(triallink);
            location.replace(gotrial);
        }else{
            alert('Hubungi pengelola jaringan untuk melakukan ujicoba pada jaringan ini.');
        }
    }

    /* use : setCookie('ppkcookie','testcookie',7); */
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    /* use : setCookie('ppkcookie','testcookie',7); */
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function checkDefaultInputFormShow() {
      var defaultform = getCookie("defaultform");
      if (defaultform == "voucher") {
        console.log("Voucher Mode Detect");
        voucher();
      } else if (defaultform == "member") {
        console.log("Member Mode Detect");
        member();
      }else {
         console.log("Entering Voucher Mode cause Empty Default");
         voucher();
      }

    }

    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }