window.onload = function() {
	var nav_main_bg = document.getElementById("nav_main_bg");
	var list = document.getElementById("list");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	var len = 5;
	var interval = 3000;
	var timer;
	var animated = false;

	function animate(offset) {
		animated = true;
		var time = 500;
		var inteval = 10;
		var speed = offset/(time/inteval);
		var left = parseInt(list.style.left) + offset;

		var go = function() {
			if ((speed < 0 && left < parseInt(list.style.left)) || (speed > 0 && left > parseInt(list.style.left))) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go, inteval);
			} else {
				list.style.left = left + "px";
				if (left > -1000) {
					list.style.left = -1000 * len + "px";
				}
				if (left < -1000*len) {
					list.style.left = "-1000px";
				}
				animated = false;
			}
		}
		go();
	}

	next.onclick = function() {
		if (animated) {
			return;
		}
		if (index == 5) {
			index =1;
		} else {
			index ++;
		}
		animate(-1000);
		showButton();
	}

	prev.onclick = function() {
		if (animated) {
			return;
		}
		if (index == 1) {
			index = 5;
		} else {
			index --;
		}
		animate(1000);
		showButton();
	}

	function showButton() {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].className == "on") {
				buttons[i].className = "";
				break;
			}
		}
		buttons[index - 1].className = "on"; 
	}

	for (var i=0; i<buttons.length; i++) {
		buttons[i].onclick = function() {
			if (animated) {
				return;
			}
			if (this.className == "on") {
				return;
			}

			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -1000 * (myIndex - index);

			animate(offset);
			index = myIndex;
			showButton();
		}
	}

	function play() {
		timer = setTimeout(function() {
			next.onclick();
			play();
		}, interval);
	}

	function stop() {
		clearTimeout(timer);
	}

	nav_main_bg.onmouseout = play;
	nav_main_bg.onmouseover = stop;

	play();
}