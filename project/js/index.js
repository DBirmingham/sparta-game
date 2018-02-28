$(function(){
	init();
	var num1 = 1
	var num2 = 1
	var counter1 = 0
	var counter2 = 0

	function init(){
		$('.menu').css({'visibility': 'visible'})
		$('#play').click(function(){
			$('.menu').css({'display': 'none'})
			gameStart();
		})

		$('#instructions').click(function(){
			$('.menu').html('<p>Player 1: w</p><p>Player 2: o</p><p>Mash the keys to outdo your opponent. Victory is given to the one who\'s covered the most distance unless one player is decisively faster than the other at the time of collision, so watch out for comebacks!</p>');
		})
	}

	function gameStart(){
		var sprite = 1
		var end = false
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
			break;
			};
			if ($('#Character2').position().left <  ($('#Character1').position().left + $('#Character1').width())) {
				$(window).off('keyup')
				gameEnd();
			}
		});

		function speed (){
			if(end){
				return
			} else {
				setInterval(counts, 500);
			}
		}

		function still (){
			if(end){
				return
			} else {
				setInterval(stay, 200);
			}
		}

		function counts (){
			console.log(counter1)
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
		$('.container').animate({opacity:0}, 3000, function(){
			$('.container').html("<img src='img/Ending/endscreenDemo.png'>")
			$('.container').animate({opacity:1}, 3000, function(){
				if (counter1 > counter2 + 1) {
					alert('Player1 wins Decisively!')
					$('#sprite2').attr('src','img/charSword/Death21.png')
				} else if (counter2 > counter1 + 1) {
					alert('Player2 wins Decisively')
					$('#sprite1').attr('src','img/charSword/Death1.png')
				} else if (counter1 == counter2) {
					if (num1 > num2) {
						alert('Player1 wins!')
						$('#sprite2').attr('src','img/charSword/Death21.png')
					} else if (num2 > num1) {
						alert('Player2 wins!')
						$('#sprite1').attr('src','img/charSword/Death1.png')
					} else {
						alert('A stunning draw!!')
					}
				}
			})
		});
	}
});