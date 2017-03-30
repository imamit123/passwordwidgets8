var $j = jQuery.noConflict();
(function ($) {
  'use strict';

  $(function () {
    /*
    * Show hide configuration fields in Backends
    */ 
    var checkedValue = $('#edit-passwordwidgets-generate-strong-password:checked').val();
    if(checkedValue == 1) {
      $('.form-item-password-range').show();
      $('#edit-password-type--wrapper').show();
    } else {
      $('.form-item-password-range').hide();
      $('#edit-password-type--wrapper').hide();
    }
    $("#edit-passwordwidgets-generate-strong-password").click(function() { 
      var checkedValue = $('#edit-passwordwidgets-generate-strong-password:checked').val();
      if(checkedValue == 1) {
        $('.form-item-password-range').slideDown();
        $('#edit-password-type--wrapper').slideDown();
      } else {
        $('#edit-password-type--wrapper').slideUp();
        $('.form-item-password-range').slideUp();
      }
    });

    /*
    * JS for login page and registration page
    */
    var passSetting = drupalSettings.passwordwidgets.passwordjs.values; 
    var strongSetting = drupalSettings.passwordwidgets.passwordjs.strong_pass;
    var passwordRange = drupalSettings.passwordwidgets.passwordjs.password_range;
    var passwordType = drupalSettings.passwordwidgets.passwordjs.password_type;

    if (passSetting != undefined) {
      if(passSetting == 1) {
        $('input:password').wrap("<div class='password-main-wrapper'></div>");
        $('<div class="image-toggle"><div class="edit-pass-images showHide" ></div></div>').insertAfter('input:password');
      } else if (passSetting == 2) {
        $('<div class="checkbox-toggle"><input type="checkbox"  class="pass-checkbox showHide"/><label for="showHide" id="showHideLabel">Show Password</label></div>').insertAfter('input:password');
        $('input:password').addClass("parent-check-box-toggle");
      } else if (passSetting == 3) {
        $('input:password').wrap("<div class='password-main-wrapper'></div>");
        $('<div class="texts-toggle"><label class="text showHide" >Show </label></div>').insertAfter('input:password');
      }
      $(".showHide").click(function() {
        if ($(this).parent().prev().attr("type") == "password") {
          $(this).parent().prev().attr("type", "text");
          $(this).addClass("pass-shown");
          $(this).removeClass("pass-hidden");
          $(".text.pass-shown").html("Hide");         
        } else {
          $(this).parent().prev().attr("type", "password");
          $(this).addClass("pass-hidden");
          $(this).removeClass("pass-shown");
          $(".text.pass-hidden").html("Show");
        }
      });
    }

    if(strongSetting == 1) {
      function randomString() {
        var chars = calculatePasswordType(passwordType);
        var string_length = calculatePasswordRange(passwordRange);
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
        }
        
        return randomstring;
      }

      if($('.form-item-pass').length) {
        $('.form-item-pass').append('<div class="strong-password"><a class="generate-password">Generate Password</a><a class="use-password">Use Password</a><div class="generated-password"></div></div>');
        
        $(".generate-password").click(function() {
          var randomstring = randomString();
          $('.generated-password').html(randomstring);
          $('.use-password').css("visibility","visible");
        });

        $(".use-password").click(function() {
          var selectPassword = $('.generated-password').html();
          if(selectPassword.length > 0) {
            $('input:password').val(selectPassword);
            $('.password-confirm span').html("yes");
            $('.password-confirm span').addClass("ok");
            $('.password-confirm span').removeClass("error");

            var strengthRange = passwordStrengthIndicator(passwordRange,passwordType);
            if(passwordRange >=70 || passwordRange <= 100) {
              $('.password-strength__indicator').css("width","70%");
              $('.password-strength__indicator').removeClass("is-good");
              $('.password-strength__indicator').addClass(".is-strong");
              $('.password-strength__indicator').removeClass(".is-fair");
              $('.password-strength__indicator').removeClass(".is-weak");
              $('.password-strength__text').html('Strong');
            } else if(passwordRange >=50 || passwordRange <= 70) {
              $('.password-strength__indicator').css("width","60%");
              $('.password-strength__indicator').addClass("is-good");
              $('.password-strength__indicator').removeClass("is-strong");
              $('.password-strength__indicator').removeClass("is-fair");
              $('.password-strength__indicator').removeClass("is-weak");
              $('.password-strength__text').html('Good');
            }else if(passwordRange >=40 || passwordRange < 50) {
              $('.password-strength__indicator').css("width","55%");
              $('.password-strength__indicator').removeClass("is-good");
              $('.password-strength__indicator').removeClass("is-strong");
              $('.password-strength__indicator').addClass("is-fair");
              $('.password-strength__indicator').removeClass("is-weak");
              $('.password-strength__text').html('Fair');
            } else {
              $('.password-strength__indicator').css("width","40%");
              $('.password-strength__indicator').removeClass("is-good");
              $('.password-strength__indicator').removeClass("is-strong");
              $('.password-strength__indicator').removeClass("is-fair");
              $('.password-strength__indicator').addClass("is-weak");
              $('.password-strength__text').html('Weak'); 
            }
          }
        });
      }
    }

    /*
    * Function for Generate random password  
    */
    function calculatePasswordType(passwordType) {
      if(passwordType == 1) {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz~!@#$%&';
      } else if(passwordType == 2) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      } else if(passwordType == 3) {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      } else if(passwordType == 4) {
        return '0123456789~!@#$%&';
      } else if(passwordType == 5) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz~!@#$%&';
      } else {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      }
    }

    /*
    * Function for get password range 
    */
    function calculatePasswordRange(passwordRange) {
      if(passwordRange == 1) {
        return '5';
      } else if(passwordRange == 2) {
        return '8';
      } else if(passwordRange == 3) {
        return '10';    
      } else if(passwordRange == 4) {
        return '12';    
      } else if(passwordRange == 5) {
        return '15';    
      } else if(passwordRange == 6) {
        return '18';   
      } else if(passwordRange == 7) {
        return '20';    
      } else {
        return '10';
      }
    }
    
    /*
    * Function for indicate password strength 
    */
    function passwordStrengthIndicator(passwordRange,passwordType) {
      if((passwordType == 1) && (passwordRange == 3)) {
        return "80" ;
      } else if((passwordType == 1) && (passwordRange == 4)) {
        return "85";
      } else if((passwordType == 1) && (passwordRange == 5)) {
        return "90";
      } else if((passwordType == 1) && (passwordRange == 6)) {
        return "95";
      } else if((passwordType == 1) && (passwordRange == 7)) {
        return "100";
      } else if((passwordType == 1) && (passwordRange == 2)) {
        return "60";
      } else if((passwordType == 1) && (passwordRange == 1)) {
        return "50";
      } else if(passwordType == 2) {
        return "60";
      } else if(passwordType == 3) {
        return "70";
      } else if(passwordType == 4) {
        return "60";
      } else if(passwordType == 5) {
        return "60";
      } else if((passwordType == 5) && (passwordRange == 1)) {
        return "40";
      } else if((passwordType == 4) && (passwordRange == 1)) {
        return "45";
      } else if((passwordType == 3) && (passwordRange == 1)) {
        return "50";
      } else {
        return '55';
      }
    }

  });
})(jQuery);