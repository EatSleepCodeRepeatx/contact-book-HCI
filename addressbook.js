const { ipcRenderer } = require('electron')

let $ = require('jquery')
let fs = require('fs')
var contacts = [];
let modal;
let vCard = require('vcf');
var name,number,dob,working_p,email,address;
var filePath1, filePath2;

// send to console 

$('#cancelbtn').on('click', () => {
  ipcRenderer.send('asynchronous-message', 'closeModal')
})


//===============================================================================================//
//                                   JS part  for adddcontact.html                               //
//===============================================================================================//
            var invalid_f = true;
            var invalid_l = true;
            var invalid_n = true; // month 
            var invalid_d = true; // day
            var invalid_y = true; // year
            var invalid_m = true; // number
            var invalid_a = true;
            var invalid_e = true;
            var invalid_c = true;
            var invalid_p = true;
            var invalid_g = true;
            var invalid_h = true;
            var flag = true;
            var bmpSpecials = /[~`!#$%\^&*+=\-\[\]\\'_;,/{}|\\":<>\?]/;
            var bmpValidNum = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            var bmpDigits = /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0AE6\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/;
		    var bmpSpaces = /[ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​\u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​​\u202f\u205f​\u3000]/
		    var hasSpecials = RegExp.prototype.test.bind(bmpSpecials);
			var hasNumber = RegExp.prototype.test.bind(bmpDigits);
			var hasSpaces = RegExp.prototype.test.bind(bmpSpaces);
			var hasValidN = RegExp.prototype.test.bind(bmpValidNum);
			
			// [Source code] : https://www.reddit.com/r/javascript/comments/2hhq1n/how_can_i_check_if_a_string_contains_a_number/
			//=====================================


			$(document).ready(function(){
			// example 
		     	$('#usercheck').hide();
                $('#fnamecheck').hide();  
                $('#lnamecheck').hide();
                $('#dobcheck1').hide();  
                $('#dobcheck2').hide(); 
                $('#dobcheck3').hide();   
                $('#numbercheck').hide(); 
                $('#addresscheck').hide();
                $('#emailcheck').hide();  
                $('#companycheck').hide();
                $('#phvalidcheck').hide(); 
                $('#gencheck').hide();
                $('#agecheck').hide(); 

	      //======================================================================================
            // for first name 
            $('#fnames').keyup(function(){
                fname_check();
            });
            function fname_check()
            {
            	var pattern = new RegExp(bmpSpecials);
				var user_val = $('#fnames').val();
				if(hasSpaces(user_val)){
					$('#fnamecheck').show();
					$('#fnamecheck').html("**First name must not contain whitespace");
					$('#fnamecheck').focus();
					$('#fnamecheck').css("color","red");
					invalid_f = false;
					return false;
				}else{
                    invalid_f = true;
					$('#fnamecheck').hide();
				}
				if(pattern.test(user_val))
				{
					$('#fnamecheck').show();
					$('#fnamecheck').html("**First name must not contain special characters");
					$('#fnamecheck').focus();
					$('#fnamecheck').css("color","red");
					invalid_f = false;
					return false;
				}
				else{
                    invalid_f = true;
					$('#fnamecheck').hide();
				}


				if(user_val.length == '')
				{
					$('#fnamecheck').show();
					$('#fnamecheck').html("**Please fill out this field");
					$('#fnamecheck').focus();
					$('#fnamecheck').css("color","red");
					invalid_f = false;
					return false;
				}
				else{
                    invalid_f = true;
					$('#lnamecheck').hide();
				}

				if((user_val.length < 2 ) )
				{
					$('#fnamecheck').show();
					$('#fnamecheck').html("**Length of first name must be greater than 2");
					$('#fnamecheck').focus();
					$('#fnamecheck').css("color","red");
					invalid_f = false;
					return false;
				}
				else{
                    invalid_f = true;
					$('#fnamecheck').hide();
				}


				if(hasNumber(user_val))
				{
					$('#fnamecheck').show();
					$('#fnamecheck').html("**First name cannot contain numeric value");
					$('#fnamecheck').focus();
					$('#fnamecheck').css("color","red");
					invalid_f = false;
					return false;
				}
				else{
                    invalid_f = true;
					$('#fnamecheck').hide();
				}


				if(!user_val.match('[a-zA-Z]+)'))
				{
					$('#fnamecheck').show();
					$('#fnamecheck').html("**Please only use English alphabet");
					$('#fnamecheck').focus();
					$('#fnamecheck').css("color","red");
					invalid_f = false;
					return false;
				}
				else{
                     invalid_f = true;
					$('#fnamecheck').hide();
				}
			

            }

            // for last name  =========================================================================
            $('#lnames').keyup(function(){
                lname_check();
            });

            function lname_check()
            {
            	var pattern = new RegExp(bmpSpecials);
				var user_val = $('#lnames').val();
				if(hasSpaces(user_val)){
					$('#lnamecheck').show();
					$('#lnamecheck').html("**Last name must not contain whitespace");
					$('#lnamecheck').focus();
					$('#lnamecheck').css("color","red");
					invalid_l = false;
					return false;
				}else{
                    invalid_l = true;
					$('#lnamecheck').hide();
				}

				if(pattern.test(user_val))
				{
					$('#lnamecheck').show();
					$('#lnamecheck').html("**Last name must not contain special characters");
					$('#lnamecheck').css.focus();
					$('#lnamecheck').css("color","red");
					invalid_l = false;
					return false;
				}
				else{
                     invalid_l = true;
					$('#lnamecheck').hide();
				}


				if(user_val.length == '')
				{
					$('#lnamecheck').show();
					$('#lnamecheck').html("**Please fill out this field");
					$('#lnamecheck').focus();
					$('#lnamecheck').css("color","red");
					invalid_l = false;
					return false;
				}
				else{
                     invalid_l = true;
					$('#lnamecheck').hide();
				}

				if((user_val.length < 2 ) )
				{
					$('#lnamecheck').show();
					$('#lnamecheck').html("**Length of last name must be greater than 2");
					$('#lnamecheck').focus();
					$('#lnamecheck').css("color","red");
					invalid_l = false;
					return false;
				}
				else{
                     invalid_l = true;
					$('#lnamecheck').hide();
				}


				if(hasNumber(user_val))
				{
					$('#lnamecheck').show();
					$('#lnamecheck').html("**Last name cannot contain numeric value");
					$('#lnamecheck').focus();
					$('#lnamecheck').css("color","red");
					invalid_l = false;
					return false;
				}
				else{
                     invalid_l = true;
					$('#usercheck').hide();
				}


				if(!user_val.match('[a-zA-Z]+)'))
				{
					$('#lnamecheck').show();
					$('#lnamecheck').html("**Please only use English alphabet");
					$('#lnamecheck').focus();
					$('#lnamecheck').css("color","red");
					invalid_l = false;
					return false;
				}
				else{
                     invalid_l = true;
					$('#lnamecheck').hide();
				}
			

            }
     //====================================================================================
            // for birth day 
            $('#bodM').keyup(function(){
                bodM_check();
      
            });
          
          
           // dobcheck
            function bodM_check()
            {           
            	var pattern = new RegExp(bmpSpecials);
                var user_val = $('#bodM').val();
 
               if(user_val.length==0){
         			$('#dobcheck1').show();
                    $('#dobcheck1').html("**Please make sure to fill month and your input doesn't contain any invalid characters");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
         		}else{
                    invalid_n = true;
                    $('#dobcheck1').hide();
                }
              
        
               if(!hasNumber(user_val))
                {
                    $('#dobcheck1').show();
                    $('#dobcheck1').html("**Month filed must not contain special characters");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
                }
                else{
                    invalid_n = true;
                    $('#dobcheck1').hide();
                }
                if(user_val.length >2) {
                    $('#dobcheck1').show();
                    $('#dobcheck1').html("**Length of month should be less than three and it should only contain digits");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
                }else{
                    invalid_n = true;
                    $('#dobcheck1').hide();
                }


                if(user_val.charAt(0)=='1' && (user_val.charAt(1) =='3' ||
                	 user_val.charAt(1) =='4' || user_val.charAt(1) =='5' ||
                	 user_val.charAt(1) =='6' || user_val.charAt(1) =='7' ||
                	 user_val.charAt(1) =='8' || user_val.charAt(1) =='9')){
                    $('#dobcheck1').show();
                    $('#dobcheck1').html("**Invalid input, there are only 12 months in a year");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
                }else{
                    invalid_n = true;
                    $('#dobcheck1').hide();
                }


                if(user_val.length >1 &&( user_val.charAt(0) =='2' ||  user_val.charAt(0) =='3'||
                	 user_val.charAt(0) =='4' || user_val.charAt(0) =='5' ||
                	 user_val.charAt(0) =='6' || user_val.charAt(0) =='7' ||
                	 user_val.charAt(0) =='8' || user_val.charAt(0) =='9')){
                	$('#dobcheck1').show();
                    $('#dobcheck1').html("**Invalid input, there are only 12 months in a year");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
                }else{
                    invalid_n = true;
                    $('#dobcheck').hide();
                }

                if(user_val.charAt(0)=='0' && user_val.length ==1){
                    $('#dobcheck1').show();
                    $('#dobcheck1').html("**Zero is invalid month ");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
                }else{
                    invalid_n = true;
                    $('#dobcheck1').hide();
                }

                if(user_val.charAt(0)=='0' && user_val.charAt(1)=='0'&&user_val.length>=2){
                    $('#dobcheck1').show();
                    $('#dobcheck1').html("**Zero is invalid month ");
                    $('#dobcheck1').focus();
                    $('#dobcheck1').css("color","red");
                    invalid_n = false;
                    return false;
                }else{
                    invalid_n = true;
                    $('#dobcheck1').hide();
                }

            }

              $('#bodD').keyup(function(){
                
                bodD_check();

            });

              function bodD_check()
            {  
				var pattern = new RegExp(bmpSpecials);
                var user_val = $('#bodD').val();
 
               if(user_val.length==0){
         			$('#dobcheck2').show();
                    $('#dobcheck2').html("**Please make sure to fill day and your input doesn't contain any invalid characters " + user_val.length);
                    $('#dobcheck2').focus();
                    $('#dobcheck2').css("color","red");
                    invalid_d = false;
                    return false;
         		}else{
                    invalid_d = true;
                    $('#dobcheck2').hide();
                }

                 if(!hasNumber(user_val))
                {
                    $('#dobcheck2').show();
                    $('#dobcheck2').html("**Day filed must not contain special characters");
                    $('#dobcheck2').focus();
                    $('#dobcheck2').css("color","red");
                    invalid_d = false;
                    return false;
                }
                else{
                    invalid_d = true;
                    $('#dobcheck2').hide();
                }
                if(user_val.length >2) {
                    $('#dobcheck2').show();
                    $('#dobcheck2').html("**Length of day should be less than three and it should only contain digits");
                    $('#dobcheck2').focus();
                    $('#dobcheck2').css("color","red");
                    invalid_d = false;
                    return false;
                }else{
                    invalid_d = true;
                    $('#dobcheck1').hide();
                }

                   if(user_val>31){
                    $('#dobcheck2').show();
                    $('#dobcheck2').html("**Invalid input, value of day field must between 1 to 31");
                    $('#dobcheck2').focus();
                    $('#dobcheck2').css("color","red");
                    invalid_d = false;
                    return false;
                }else{
                    invalid_d = true;
                    $('#dobcheck2').hide();
                }

                if(user_val == 0 ||user_val==00){
                	$('#dobcheck2').show();
                    $('#dobcheck2').html("**Zero is not a valid day number");
                    $('#dobcheck2').focus();
                    $('#dobcheck2').css("color","red");
                    invalid_d = false;
                    return false;
                }else{
                     invalid_d = true;
                    $('#dobcheck2').hide();
                }


            }  
 

 		    $('#bodY').keyup(function(){
         
                bodY_check();
            });
              function bodY_check()
            {    
                var pattern = new RegExp(bmpSpecials);
                var user_val = $('#bodY').val();
 
               if(user_val.length==0){
         			$('#dobcheck3').show();
                    $('#dobcheck3').html("**Please make sure to fill year and your input doesn't contain any invalid characters");
                    $('#dobcheck3').focus();
                    $('#dobcheck3').css("color","red");               
                    invalid_y = false;
                    return false;
         		}else{
                    invalid_y = true;
                    $('#dobcheck3').hide();
                }

                if(!hasNumber(user_val))
                {
                    $('#dobcheck3').show();
                    $('#dobcheck3').html("**Year filed must not contain special characters");
                    $('#dobcheck3').focus();
                    $('#dobcheck3').css("color","red");
                    invalid_y = false;
                    return false;
                }
                else{
                    invalid_y = true;    
                    $('#dobcheck3').hide();
                }
                if(user_val.length >5) {
                    $('#dobcheck3').show();
                    $('#dobcheck3').html("**Length of year should be less than six and it should only contain digits");
                    $('#dobcheck3').focus();
                    $('#dobcheck3').css("color","red");
                    invalid_y = false;
                    return false;
                }else{
                    invalid_y = true;
                    $('#dobcheck3').hide();
                }


                   if(user_val<1900 || user_val>2101){
                    $('#dobcheck3').show();
                    $('#dobcheck3').html("**Invalid input, value of year must between 1990 to 2100");
                    $('#dobcheck3').focus();
                    $('#dobcheck3').css("color","red");
                    invalid_y = false;
                    return false;
                }else{
                    invalid_y = true;
                    $('#dobcheck3').hide();
                }

                if(user_val == 0000 || user_val==0|| user_val==000||user_val==00){
                	$('#dobcheck3').show();
                    $('#dobcheck3').html("**Zero is not a valid year number");
                    $('#dobcheck3').focus();
                    $('#dobcheck3').css("color","red");
                    invalid_y = false;
                    return false;
                }else{
                     invalid_y = true;
                    $('#dobcheck3').hide();
                }

            }
            // for phone number 
            $('#numbers').keyup(function(){
                numbers_check();
            });

            function numbers_check()
            {
            	var str = "Valid format :" +"<br/>"+"(123)456-7890"+"<br/>"+
            			  "               123-456-7890"+"<br/>"+
            			  "               123.456.7890"+"<br/>"+
            			  "               1234567890"+"<br/>"+
            			  "               +00123456789"+"<br/>"+
            			  "               123-4567890";



                var pattern = new RegExp(bmpSpecials);
                var user_val = $('#numbers').val();

          		


               if(user_val.length==0){
         			$('#numbercheck').show();
                    $('#numbercheck').html("**Please make sure to fill number "+"<br/>"+str);
                    $('#numbercheck').focus();
                    $('#numbercheck').css("color","red");
                    invalid_m = false;
                    return false;
                   invalid_m = true;
         		}else{
                    $('#numbercheck').hide();
                }


          		if(user_val.length<=9){
					$('#numbercheck').show();
                    $('#numbercheck').html("**Phone number must be 10 digits long and can't contain any alphabet"+"<br/>"+str);
                    $('#numbercheck').focus();
                    $('#numbercheck').css("color","red");
                    invalid_m = false;
                    return false;
          		}else{
                    invalid_m = true;
					$('#numbercheck').hide();
          		}


            	if(!hasValidN(user_val)){
            		$('#numbercheck').show();
                    $('#numbercheck').html("**Please correct your input"+"<br/>"+str);
                    $('#numbercheck').focus();
                    $('#numbercheck').css("color","red");
                    invalid_m = false;
                    return false;
            	}else{
                    invalid_m = true;
            		$('#numbercheck').hide();
            	}
          
            }

            $('#addresss').keyup(function(){
                address_check();
            });
            function address_check()
            {

            	
            	var pattern = new RegExp(bmpSpecials);
				var user_val = $('#addresss').val();
		
			 if(!hasSpaces(user_val) || user_val.length == '')
				{
					$('#addresscheck').show();
					$('#addresscheck').html("**Address is missing or it is not defined in correct way");
					$('#addresscheck').focus();
					$('#addresscheck').css("color","red");
					invalid_a = false;
					return false;
				}
				else{
                    invalid_a = true;
					$('#addresscheck').hide();
				}

				if(pattern.test(user_val))
				{
					$('#addresscheck').show();
					$('#addresscheck').html("**Address cannot contain special characters");
					$('#addresscheck').focus();
					$('#addresscheck').css("color","red");
					invalid_a = false;
					return false;
				}
				else{
                    invalid_a = true;
					$('#fnamecheck').hide();
				}



			

				if((user_val.length < 6 ) )
				{
					$('#addresscheck').show();
					$('#addresscheck').html("**Length of address must be greater than 6");
					$('#addresscheck').focus();
					$('#addresscheck').css("color","red");
					invalid_a = false;
					return false;
				}
				else{
                     invalid_a = true;
					$('#addresscheck').hide();
				}

			
            }

            // for email 
             $('#emails').keyup(function(){
                email_check();
            });
            function email_check()
            {
            	  var user_val = $('#emails').val();
            	  var at_index = user_val.indexOf('@');

            	  if(at_index!=-1&&at_index!=0)
            	  {
            	  		if(hasNumber(user_val.charAt(0))){
            	  			$('#emailcheck').show();
                    		$('#emailcheck').html("**Email can't start with number or special characters");
                    		$('#emailcheck').focus();
                    		$('#emailcheck').css("color","red");
                			invalid_e = false;
                    		return false;
            	  		}else{
                            invalid_e = true;
            	  			$('#emailcheck').hide();
            	  		}
            	  }
            	  else if(at_index<=0){
            	  	$('#emailcheck').show();
                    $('#emailcheck').html("**Invalid @ position");
                    $('#emailcheck').focus();
                    $('#emailcheck').css("color","red");
                    invalid_e = false;
                    return false;
                }
                else{
                     invalid_e = true;
                    $('#emailcheck').hide();
                }
            	  
            	  if(user_val==""&&user_val.length==0){
       				$('#emailcheck').show();
                    $('#emailcheck').html("**Email is missing");
                    $('#emailcheck').focus();
                    $('#emailcheck').css("color","red");
                    invalid_e = false;
                    return false;
                }
                else{
                     invalid_e = true;
                    $('#emailcheck').hide();
                }
                 if(user_val.charAt(user_val.length-4)!='.' && user_val.charAt(user_val.length-3)!='.'  ){
       				$('#emailcheck').show();
                    $('#emailcheck').html("**Invalid . position");
                    $('#emailcheck').focus();
                    $('#emailcheck').css("color","red");
                    invalid_e = false;
                    return false;
                }
                else{
                     invalid_e = true;
                    $('#emailcheck').hide();
                }

                if(hasSpecials(user_val)){
       				$('#emailcheck').show();
                    $('#emailcheck').html("**Email should not contain special characters");
                    $('#emailcheck').focus();
                    $('#emailcheck').css("color","red");
                    invalid_e = false;
                    return false;
                }
                else{
                     invalid_e = true;
                    $('#emailcheck').hide();
                }

            }

            // for company 
             $('#companys').keyup(function(){
                companys_check();
            });
             function companys_check(){
            	

            	var pattern = new RegExp(bmpSpecials);
				var user_val = $('#companys').val();

				if(pattern.test(user_val))
				{
					$('#companycheck').show();
					$('#companycheck').html("**Company name must not contain special characters");
					$('#companycheck').focus();
					$('#companycheck').css("color","red");
					invalid_c = false;
					return false;
				}
				else{
                    invalid_c = true;
					$('#companycheck').hide();
				}

				if(user_val.length == '')
				{
					$('#companycheck').show();
					$('#companycheck').html("**Please fill out this field");
					$('#companycheck').focus();
					$('#companycheck').css("color","red");
					invalid_c = false;
					return false;
				}
				else{
                     invalid_c = true;
					$('#companycheck').hide();
				}

				if((user_val.length < 2 ) )
				{
					$('#companycheck').show();
					$('#companycheck').html("**Length of first name must be greater than 1");
					$('#companycheck').focus();
					$('#companycheck').css("color","red");
					invalid_c = false;
					return false;
				}
				else{
                    invalid_c = true;
					$('#companycheck').hide();
				}

             }
            
            // for age 
              $('#age').keyup(function(){
                age_check();
              });
                 function age_check()
            {           
            	var pattern = new RegExp(bmpSpecials);
                var user_val = $('#age').val();
 
               if(user_val.length==0){
         			$('#agecheck').show();
                    $('#agecheck').html("**Please make sure to fill the age and your input doesn't contain any invalid characters");
                    $('#agecheck').focus();
                    $('#agecheck').css("color","red");
                    invalid_h = false;
                    return false;
         		}else{
                    invalid_h = true;
                    $('#dobcheck1').hide();
                }
              
        
               if(!hasNumber(user_val))
                {
                    $('#agecheck').show();
                    $('#agecheck').html("**Age filed must not contain special characters");
                    $('#agecheck').focus();
                    $('#agecheck').css("color","red");
                    invalid_h = false;
                    return false;
                }
                else{
                    invalid_h = true;
                    $('#agecheck').hide();
                }
                if(user_val>101) {
                    $('#agecheck').show();
                    $('#agecheck').html("**You are over age for this register form, please exit the program and take a rest");
                    $('#agecheck').focus();
                    $('#agecheck').css("color","red");
                    invalid_h = false;
                    return false;
                }else{
                    invalid_h = true;
                    $('#agecheck').hide();
                }


                if(user_val.charAt(0)=='1' && (user_val.charAt(2) =='3' ||
                	 user_val.charAt(2) =='4' || user_val.charAt(2) =='5' ||
                	 user_val.charAt(2) =='6' || user_val.charAt(2) =='7' ||
                	 user_val.charAt(2) =='8' || user_val.charAt(2) =='9')){
                    $('#agecheck').show();
                    $('#agecheck').html("**You are over age for this register form, please exit the program and take a rest");
                    $('#agecheck').focus();
                    $('#agecheck').css("color","red");
                    invalid_h = false;
                    return false;
                }else{
                    invalid_h = true;
                    $('#agecheck').hide();
                }



                if(user_val.charAt(0)=='0' ){
                    $('#agecheck').show();
                    $('#agecheck').html("**Age should start with zero");
                    $('#agecheck').focus();
                    $('#agecheck').css("color","red");
                    invalid_h = false;
                    return false;
                }else{
                    invalid_h = true;
                    $('#agecheck').hide();
                }

                if(user_val.charAt(0)=='0' && user_val.charAt(1)=='0'&&user_val.length>=2){
                    $('#agecheck').show();
                    $('#agecheck').html("**Invalid input, please correct your age ");
                    $('#agecheck').focus();
                    $('#agecheck').css("color","red");
                    invalid_h = false;
                    return false;
                }else{
                    invalid_h = true;
                    $('#agecheck').hide();
                }

            }

   
                
                
                
            // for gender
                
            $('#gender').keyup(function(){
                gender_check();
            });
            
             function gender_check(){
            	
				var user_val = $('#gender').val();
	           if(user_val.length == ' ')
				{
					$('#agecheck').show();
					$('#agecheck').html("**Gender field cannot be empty");
					$('#agecheck').focus();
					$('#agecheck').css("color","red");
					invalid_g = false;
					return false;
				}
				else{
                     invalid_g = true;
					$('#agecheck').hide();
				}
                 
             }
                
                
                
                

            // for correct photo form 
             $('#photos').keyup(function(){
                photo_check();
            });
            function photo_check()
            {
            	   var user_val = $('#photos').val();
            	   var Extension = document.getElementById('photos').value;
                   filePath1 = Extension;
                   filePath2 = user_val;
            	   if(Extension != "gif" || Extension != "png" || Extension != "bmp"
                    || Extension != "jpeg" || Extension != "jpg"){

            	   	$('#phvalidcheck').show();
					$('#phvalidcheck').html("**File extension must be one of following: gif, png, bmp. jpeg, jpg");
					$('#phvalidcheck').focus();
					$('#phvalidcheck').css("color","red");
					invalid_p = false;
					return false;
				}
				else{ 
                    invalid_p = true;
					$('#phvalidcheck').hide();
				}    
            }

		});

//document.getElementById("imageid").src="../template/save.png";
// filePath1, filePath2

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            filePath1 = this.files[0];
        }
    });
});

function imageIsLoaded(e) {
    $('#pic').attr('src', e.target.result);
};

$('#addbtn').on('click', () => {
 if(invalid_f && invalid_l && invalid_n&& invalid_d&& invalid_y&& invalid_m&&invalid_a&& invalid_e&& invalid_c &&invalid_p&&invalid_g&&invalid_h){     
  name = $('#fnames').val() + " "+$('#lnames').val(); 
  number = $('#numbers').val();
  dob  =  $('#bodM').val()+"/"+$('#bodD').val()+"/"+$('#bodY').val();
  working_p = $('#companys').val();
  email=  $('#emails').val();
  address = $('#addresss').val();
  age = $('#age').val();
  gender = $('#gender').val();

//  photo = = filePath;
  fs.appendFileSync('contacts.txt', name+","+number+","+dob+","+address+","+email+","+working_p+","+ age +","+gender+","+filePath1+'\n', (err) => {
    if (err) throw err;
    console.log("the data was appended!");
  });
  ipcRenderer.send('asynchronous-message', 'closeAndRefresh')

 }
}
               
)



//================================================================    
function addEntry(name, number,dob,address,email,company,age,gender){
  var contact = [];
  contact['name'] = name;
  contact['number'] = number;
  contact['dob'] = dob;
  contact['address'] = address;
  contact['email'] = email;
  contact['company'] =company;
  contact['age'] =age;
  contact['gender'] =gender;
//  contact['photo'] = photo;
  contacts.push(contact);
  var index = contacts.length-1;

  let updateString = "<tr onclick='loadDetails(" + index + ")'><td>" + name + "</td><td>" + number + "</td></tr>";

  $('#contactlist').append(updateString)
}


function loadDetails(index){
    var contact = contacts[index];
    $('#selectedname').text(contact.name);
    $('#selectednumber').text(contact.number);
    $('#selectedbod').text(contact.dob);
    $('#selectedaddress').text(contact.address);
    $('#selectedemail').text(contact.email);
    $('#selectedcompany').text(contact.company);
    $('#selectedage').text(contact.age);
    $('#selectedgender').text(contact.gender);
    
    $('#deletebtn').off('click');
    $('#deletebtn').on('click', () => {
      deleteEntry(index);
    })
}


function deleteEntry(index){

    contacts.splice(index, 1);
    fs.truncateSync('contacts.txt');
    
    contacts.forEach((contact, index) => {

      fs.appendFileSync('contacts.txt', contact.name+","+contact.number+","+contact.dob+","+contact.address+","+contact.email+","+contact.company+","+contact.age+","+contact.gender+","+contact.photo+'\n', (err) => {
        if (err) throw err;
        console.log("the data was appended!");
      });
    })

    contacts = [];
    loadAndDisplayContacts();
}




function loadAndDisplayContacts() {
   let filename = "contacts.txt";
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      $('#contactlist').html("<tr><th>Name</th><th>Phone</th></tr>");   
      data.forEach((contact, index) => {
         let [ name,number,dob,address,email,company,photo,age,gender] = contact.split(',')       
         if (name && number && dob && address && email && company && gender && age){
             addEntry(name,number,dob,address,email,company,gender,age)
         }
      })
      if (contacts.length > 0){
        loadDetails(0);
      }
   }
}


function showAddContactModal(){
  ipcRenderer.send('asynchronous-message', 'showModal')
}




function importFile(filename){
    let data = fs.readFileSync(filename, 'utf8');
    var cards = vCard.parse(data);
    cards.forEach((card, index) => {
      fs.appendFileSync('contacts.txt', card.get("n")+","+card.get("tel")+","+card.get("adr")+","+card.get("email")+","+card.get("org")+'\n',  (err) => {
        if (err) throw err;
        console.log("the data was appended!");
      });
    });
    contacts = [];
    loadAndDisplayContacts();
}
//      var str1 = card.get("n");
//      var str2 = card.get("tel");
//      var str3 = card.get("adr");
//      var str4 = card.get("email");
//      var str5 = card.get("org");
//      var str6 = card.get("n");
//      str1 = str1.replace (/,/g, "");
//      str2 = str2.replace (/,/g, "");
//      str3 = str3.replace (/,/g, "");
//      str4 = str4.replace (/,/g, "");
//      str5 = str5.replace (/,/g, "");
//      str6 = str6.replace (/,/g, "");

function exportFile(){
    contacts.forEach((contact, index) => {
//    console.log('exporting contact ');
    card = new vCard();
    card.set("n", contact.name);
    card.set("tel", contact.number);
    card.set("dob", contact.dob);
    card.set("adr",contact.address);
    card.set("email",contact.email);
    card.set("org",contact.company);
    fs.appendFileSync("vcard.txt", card.toString(),(err) => {
      if (err) throw err;
      console.log("the data was exported!");
    });

  })
}
