$(document).ready(function() {
	$('#scrollNav').hide();
	var scrollLink = $('.scroll');
	var scrollHome = $('.scrollHome');
	// Smooth scrolling for home
	scrollHome.click(function(e) {
		e.preventDefault();
		$('body,html').animate(
			{
				scrollTop: $(this.hash).offset().top - 500,
			},
			800,
		);
	});

	// Smooth scrolling
	scrollLink.click(function(e) {
		e.preventDefault();
		$('body,html').animate(
			{
				scrollTop: $(this.hash).offset().top,
			},
			800,
		);
	});

	var elements = document.getElementsByClassName('txt-rotate');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-rotate');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		}
	}

	var css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
	document.body.appendChild(css);

	$(window).scroll(function() {
		//after scrolling
		if ($(this).scrollTop() > 500) {
			$('#oriNav').fadeOut(500); //original nav bar fades out
			$('#scrollNav').fadeIn(500); //scrolling nav bar fades in
			if ($('#navbarText').hasClass('show')) {
				$('#navbarText').attr('class', 'navbar-collapse collapse show');
			} else {
				$('#navbarText').attr('class', 'navbar-collapse collapse');
			}
			if ($('#navbarText2').hasClass('show')) {
				$('#navbarText2').attr('class', 'navbar-collapse collapse show');
			} else {
				$('#navbarText2').attr('class', 'navbar-collapse collapse');
			}
		} else {
			//before scrolling
			$('#oriNav').fadeIn(500); //original nav bar fades in
			$('#scrollNav').fadeOut(500); //original nav bar fades out
			if ($('#navbarText').hasClass('show')) {
			} else {
			}
			if ($('#navbarText2').hasClass('show')) {
			} else {
			}
		}
	});

	//when the list in navbar is clicked hide the collapse
	$(".navbar-nav li a:not('.dropdown-toggle')").on('click', function() {
		$('.navbar-collapse').collapse('hide');
	});

	//getting the screen resolution
	console.log(
		'browser width: ' +
			$(window).width() +
			' height: ' +
			$(window).height() +
			' innerwidth: ' +
			window.innerWidth +
			' innerheight: ' +
			window.innerHeight,
	);

	// //onload set the height of the cloud and the homepage
	// $('#firstparallax').css('height', window.innerHeight);
	// $('#cloud1').css('height', window.innerHeight);
	// //set the position of the title - 40% of the screen height
	// $('#title').css('top', window.innerHeight * (40 / 100));
	// //if the width of the browser and the width of the screen is less than
	// if (window.innerWidth < 1080 || screen.width < 1920) {
	// 	$('#aboutContentBox').css('width', (window.innerWidth * 60) / 100);
	// }

	console.log('screen height: ' + screen.height + ' screen width: ' + screen.width);

	// Wrap every letter in a span
	$('.ml6 .letters').each(function() {
		$(this).html(
			$(this)
				.text()
				.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"),
		);
	});

	anime
		.timeline({ loop: true })
		.add({
			targets: '.ml6 .letter',
			translateY: ['1.1em', 0],
			translateZ: 0,
			duration: 750,
			delay: function(el, i) {
				return 50 * i;
			},
		})
		.add({
			targets: '.ml6',
			opacity: 0,
			duration: 1000,
			easing: 'easeOutExpo',
			delay: 1000,
		});
});

var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
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

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 300 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 300;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

//var x = 0;
//dynamically change the size of the homepage according to the window's size
function resizeFirstPage() {
	//var txt = (x += 1);
	//document.getElementById("demo").innerHTML = txt;
	// $('#firstparallax').css('height', window.innerHeight);
	// console.log('window innerHeight: ' + window.innerHeight);
	// //readjust the height of the cloud to 87% of the screen height
	// $('#cloud1').css('height', window.innerHeight);
	// //40% of the screen height
	// $('#title').css('top', window.innerHeight * (40 / 100));
	// //if the width of the browser and the width of the screen is less than
	// if (window.innerWidth < 1080 || screen.width < 1920) {
	// 	$('#aboutContentBox').css('width', (window.innerWidth * 60) / 100);
	// } else {
	// 	$('#aboutContentBox').css('width', (window.innerWidth * 40) / 100);
	// }
}
