jQuery(function($){

	"use strict";

	$('.eut-register-form-btn').click(function(e){
		e.preventDefault();
		$('.eut-login-form-item').hide();
		$('.eut-register-form').show();
	});
	$('.eut-login-form-btn').click(function(e){
		e.preventDefault();
		$('.eut-login-form-item').hide();
		$('.eut-login-form').show();
	});
	$('.eut-reset-password-form-btn').click(function(e){
		e.preventDefault();
		$('.eut-login-form-item').hide();
		$('.eut-reset-password-form').show();
	});

	// Post login form
	$('#eut_login_form').on('submit', function(e){

		e.preventDefault();

		$.post(eut_form.ajaxurl, $('#eut_login_form').serialize(), function(data){

			var obj = $.parseJSON(data);

			$('.eut-login-form .eut-form-errors').html(obj.message);

			if(obj.error == false){
				window.location.reload(true);
			}

		});

	});


	// Post register form
	$('#eut_registration_form').on('submit', function(e){

		e.preventDefault();

		$.post(eut_form.ajaxurl, $('#eut_registration_form').serialize(), function(data){

			var obj = $.parseJSON(data);

			$('.eut-register-form .eut-form-errors').html(obj.message);

			if(obj.error == false){

			}


		});

	});

	// Reset Password
	$('#eut_reset_password_form').on('submit', function(e){

		e.preventDefault();

		$.post(eut_form.ajaxurl, $('#eut_reset_password_form').serialize(), function(data){

			var obj = $.parseJSON(data);

			$('.eut-reset-password-form .eut-form-errors').html(obj.message);

		});

	});

	$('.eut-login-form-item').hide();
	$('.eut-login-form').show();

});