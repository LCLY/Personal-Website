$(document).ready(function() {
	$("#scrollNav").hide();
	var scrollLink = $(".scroll");
	var scrollHome = $(".scrollHome");
	// Smooth scrolling for home
	scrollHome.click(function(e) {
		e.preventDefault();
		$("body,html").animate(
			{
				scrollTop: $(this.hash).offset().top - 500,
			},
			500,
		);
	});

	// Smooth scrolling
	scrollLink.click(function(e) {
		e.preventDefault();
		$("body,html").animate(
			{
				scrollTop: $(this.hash).offset().top,
			},
			500,
		);
	});

	var elements = document.getElementsByClassName("txt-rotate");
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute("data-rotate");
		var period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		}
	}

	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
	document.body.appendChild(css);

	$(window).scroll(function() {
		//after scrolling
		if ($(this).scrollTop() > 500) {
			$("#oriNav").fadeOut(500); //original nav bar fades out
			$("#scrollNav").fadeIn(500); //scrolling nav bar fades in
			if ($("#navbarText").hasClass("show")) {
				console.log("SHOW!");
			} else {
				console.log("NO SHOW!");
			}
			if ($("#navbarText2").hasClass("show")) {
				console.log("SHOW 2!");
			} else {
				console.log("NO SHOW 2!");
			}
		} else {
			//before scrolling
			$("#oriNav").fadeIn(500); //original nav bar fades in
			$("#scrollNav").fadeOut(500); //original nav bar fades out
			if ($("#navbarText").hasClass("show")) {
				console.log("SHOW!");
			} else {
				console.log("NO SHOW!");
			}
			if ($("#navbarText2").hasClass("show")) {
				console.log("SHOW 2!");
			} else {
				console.log("NO SHOW 2!");
			}
		}
	});

	//making animation for open and close navbar menu
	var open = false;

	$(".navbar-toggler").click(function() {
		if (open) {
			$("#circle").attr("class", "fas fa-plus-circle");
			$("#circle2").attr("class", "fas fa-plus-circle");
		} else {
			$("#circle").attr("class", "fas fa-plus-circle open");
			$("#circle2").attr("class", "fas fa-plus-circle open");
		}

		open = !open;
	});
});

//Code from https://css-tricks.com/snippets/css/typewriter-effect/
var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = "";
	this.tick();
	this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

	var that = this;
	var delta = 300 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false;
		this.loopNum++;
		delta = 300;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};
