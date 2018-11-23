$(document).ready(function() {
	$(".navbar").hide();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$(".navbar").fadeIn(500);
		} else {
			$(".navbar").fadeOut(500);
		}
	});
});
