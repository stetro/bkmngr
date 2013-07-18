$(function() {
	$("#signinswitch").click(function() {
		$("#signupform").fadeOut("fast",function() {
			$("#signinform").fadeIn("fast");
		})
	});
	$("#signupswitch").click(function() {
		$("#signinform").fadeOut("fast",function() {
			$("#signupform").fadeIn("fast");
		})
	});
});