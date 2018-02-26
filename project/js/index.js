$(function(){
	var num1 = 1
	var num2 = 1
	var count1 = 0
	var count2 = 0
	var counter1 = 0
	var counter2 = 0

	window.addEventListener('keyup', function(event){
		switch (event.key){
		case 'w':
		num1 += 1;
		++counter1;
		$('#Character1').css('left', num1 + '%');
		break;
		case 'o':
		num2 += 1;
		++counter2;
		$('#Character2').css('right', num2 + '%');
		break;
		};
		if ($('#Character2').position().left <  ($('#Character1').position().left + $('#Character1').width())) {
			if (counter1 > counter2 + 1) {
				alert('Player1 wins Decisively!')
			} else if (counter2 > counter1 + 1) {
				alert('Player2 wins Decisively')
			} else if (counter1 == counter2) {
				if (num1 > num2) {
					alert('Player1 wins!')
				} else if (num2 > num1) {
					alert('Player2 wins!')
				} else {
					alert('A stunning draw!!')
				}
			}
		}
	});

	function speed (){
		setInterval(counts, 500)
	}

	function counts (){
		console.log(counter1)
		console.log(counter2)
		if (counter1 !== 0 || counter2 !== 0){
			counter1 = 0
			counter2 = 0	
		}
	}

	speed();
});