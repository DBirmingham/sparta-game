$(function(){
	init();
	var num1 = 1
	var num2 = 1
	var counter1 = 0
	var counter2 = 0

	function init(){
		$('.menu').css({'visibility': 'visible'})
		$('#play').click(function(){
			$('.menu').css({'visibility': 'hidden'})
			gameStart();
		})

		$('#instructions').click(function(){
			var oldHTML = $('.menu').html()
			$('.menu').html('<p id="X" style="text-align: left">X</p><p>Player 1: w</p><p>Player 2: o</p><p>Mash the keys to outdo your opponent. Victory is given to the one who\'s covered the most distance unless one player is decisively faster than the other at the time of collision, so watch out for comebacks!</p>');
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
		$(window).on('keyup', function(event){
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
			// console.log($(window).width()/100)
			break;
			};
			if ($('#Character2').position().left <  ($('#Character1').position().left + $('#Character1').width())) {
				$(window).off('keyup')
				clearInterval(standStill)
				clearInterval(pedometer)
				if (counter1 > counter2 + 1) {
					p1Win.sprite1
					p1Win.sprite2
					$('.menu').html('<h1>Player1 wins Decisively!!</h1><p>To the winner go the spoils</p><p>Play Again?</p><p>Main Menu</p>')
					$('.menu').css({'visibility': 'visible'})
				} else if (counter2 > counter1 + 1) {
					p2Win.sprite1
					p2Win.sprite2
					$('.menu').html('<h1>Player2 wins Decisively!!</h1><p>To the winner go the spoils</p><p>Play Again?</p><p>Main Menu</p>')
					$('.menu').css({'visibility': 'visible'})
				} else if (counter1 == counter2 || counter1 == counter2 + 1 || counter2 == counter1 + 1) {
					if (num1 > num2) {
						p1Win.sprite1
						p1Win.sprite2
						$('.menu').html('<h1>Player1 wins!</h1><p></p><p>Play Again?</p><p>Main Menu</p>')
						$('.menu').css({'visibility': 'visible'})
					} else if (num2 > num1) {						
						p2Win.sprite1
						p2Win.sprite2
						$('.menu').html('<h1>Player2 wins!</h1><p>To the winner go the spoils</p><p>Play Again?</p><p>Main Menu</p>')
						$('.menu').css({'visibility': 'visible'})
					} else {
						alert('A stunning draw!!');
						$('.menu').html('<h1>NO CONTEST</h1><p>Play Again?</p><p>Main Menu</p>')
						$('.menu').css({'visibility': 'visible'})
					}
				}
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
			console.log(counter1)
			console.log(counter2)
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

		var p1win = {
			sprite2: $('#sprite2').attr('src','img/Ending/Defeat21.png'),
			sprite1: $('#sprite1').attr('src','img/Ending/Victory1.png')
		}

		var p2win = {
			sprite2: $('#sprite2').attr('src','img/Ending/Victory21.png'),
			sprite1: $('#sprite1').attr('src','img/Ending/Defeat1.png')
		}

		speed();
		still();
	}

	// function gameEnd(num){
	// 	$('.container').animate({opacity:0}, 3000, function(){
	// 		$('.container').animate({opacity:1}, 3000, function(){
				
	// 		})
	// 	});
	// }
});