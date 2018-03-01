$(function(){
	init();
	cloudy();
	console.log($('.clouds').width())
	var counter1 = 0
	var counter2 = 0
	var num1 = 1
	var num2 = 1
	var main = document.getElementById('main')
	var victory = document.getElementById('victory')

	function cloudy(){
		setInterval(cloud, 2000)
	}

	function cloud(){
		var offset = $(window).width() + 512
		$('.clouds').animate({left: offset}, 10000, function(){
			$('.clouds').css({'position':'absolute','left': '-256px'})
		})
	}

	function countdown(){
		$('.menu').html("<h1 class='countdown'>3</h1>")
		setTimeout(function(){
			$('.menu').html("<h1 class='countdown'>2</h1>")
		},1000)
		setTimeout(function(){
			$('.menu').html("<h1 class='countdown'>1</h1>")
		},2000)
		setTimeout(function(){
			$('.menu').html("<h1 class='GO'>GO!</h1>")
			$('#GO')
			gameStart();
		},3000)
		setTimeout(function(){
			$('.menu').css({'visibility': 'hidden'})
		},3500)
	}

	function init(){
		$.stopSound();
		$.playSound('aud/MainTheme.mp3')
		$('.menu').html("<h1>Joust!!</h1><ul class='menuList'><li id='play'>Play</li><li id='instructions'>Instructions</li></ul>")
		$('.menu').css({'visibility': 'visible'})
		$('#play').click(countdown)

		$('#instructions').click(function(){
			var oldHTML = $('.menu').html()
			$('.menu').html('<p id="X" style="text-align: left">X</p><p>Player 1: w</p><p>Player 2: o</p><p>Mash the keys to outdo your opponent. Fastest finger is the winner but watch out for comebacks!</p>');
			$('#X').on('click', function(){
				$('.menu').html(oldHTML);
				init();
			})
			$(window).on('keydown', function(event){
				switch (event.key){
				case 'Escape':
					$('.menu').html(oldHTML);
					init();
					$(window).off('keydown');	
				break;
				}
			})
		})
	}

	function gameStart(){
		var standStill = setInterval(stay, 200)
		var pedometer = setInterval(counts, 500)
		var sprite = 1

		$(window).on('keydown', function(event){
			switch (event.key){
			case 'w':
			num1 += 1;
			++counter1;
			spriteChange();
			$('#Character1').css('left', num1 + '%');
			break;
			case 'o':
			num2 += 1;
			++counter2;
			spriteChange2();
			$('#Character2').css('right', num2 + '%');
			break;
			};
			if ($('#Character2').position().left <  ($('#Character1').position().left + $('#Character1').width())) {
				$(window).off('keydown')
				$.stopSound();
				$.playSound('aud/collide.mp3')
				clearInterval(standStill)
				clearInterval(pedometer)
				setTimeout(function(){
					if (counter1 > counter2 + 1) {
						$('#sprite2').attr('src','img/Ending/Defeat21.png')
						$('#sprite1').attr('src','img/Ending/Victory1.png')
						$('.menu').html('<h1>Player1 wins Decisively!!</h1><p>To the winner go the spoils</p><p id="replay">Play Again?</p><p id="restart">Main Menu</p>')
						$('.menu').css({'visibility': 'visible'})
						gameEnd();
					} else if (counter2 > counter1 + 1) {
						$('#sprite2').attr('src','img/Ending/Victory21.png')
						$('#sprite1').attr('src','img/Ending/Defeat1.png')
						$('.menu').html('<h1>Player2 wins Decisively!!</h1><p>To the winner go the spoils</p><p id="replay">Play Again?</p><p id="restart">Main Menu</p>')
						$('.menu').css({'visibility': 'visible'})
						gameEnd();
					} else if (counter1 == counter2 || counter1 == counter2 + 1 || counter2 == counter1 + 1) {
						if (num1 > num2) {
							$('#sprite2').attr('src','img/Ending/Defeat21.png')
							$('#sprite1').attr('src','img/Ending/Victory1.png')
							$('.menu').html('<h1>Player1 wins!</h1><p></p><p id="replay">Play Again?</p><p id="restart">Main Menu</p>')
							$('.menu').css({'visibility': 'visible'})
							gameEnd();
						} else if (num2 > num1) {						
							$('#sprite2').attr('src','img/Ending/Victory21.png')
							$('#sprite1').attr('src','img/Ending/Defeat1.png')
							$('.menu').html('<h1>Player2 wins!</h1><p>To the winner go the spoils</p><p id="replay">Play Again?</p><p id="restart">Main Menu</p>')
							$('.menu').css({'visibility': 'visible'})
							gameEnd();
						} else {
							alert('A stunning draw!!');
							$('.menu').html('<h1>NO CONTEST</h1><p id="replay">Play Again?</p><p id="restart">Main Menu</p>')
							$('.menu').css({'visibility': 'visible'})
							gameEnd();
						}
					}	
				}, 1000)
				
				// gameEnd();
			}
		});

		function speed (){
			pedometer;
		}

		function still (){
			standStill;
		}

		function counts (){
			if (counter1 !== 0 || counter2 !== 0){
				counter1 = 0
				counter2 = 0	
			}
		}

		function stay (){
			if (counter1 == 0){
				$('#sprite1').attr('src','img/charSword/Idle1.png')
			}
			if (counter2 == 0){
				$('#sprite2').attr('src','img/charSword/Idle21.png')
			} 
		}

		function spriteChange(){
			++sprite
			$('#sprite1').attr('src','img/charSword/Run'+sprite+'.png' )
			if (sprite > 5){
				sprite = 1
			}
		}

		function spriteChange2(){
			++sprite
			$('#sprite2').attr('src','img/charSword/Run2'+sprite+'.png' )
			if (sprite > 5){
				sprite = 0
			}
		}

		speed();
		still();
	}

	function gameEnd(){
		$.stopSound();
		$.playSound('aud/Victory.mp3');
		$('#replay').click(function(){
			num1 = 1
			num2 = 1
			$('#Character1').css('left', num1 + '%')
			$('#Character2').css('right', num2 + '%')
			$.stopSound();
			$.playSound('aud/MainTheme.mp3')
			countdown();
		})
		$('#restart').click(function(){
			num1 = 1
			num2 = 1
			$('#Character1').css('left', num1 + '%')
			$('#Character2').css('right', num2 + '%')
			init();
		})
	}
});