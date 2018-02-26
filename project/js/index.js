//119 W
//111 O

//Take keyboard inputs and progress the bars
var num1 = 0
var num2 = 0
var count1 = 0
var count2 = 0

window.addEventListener('keydown', function(event){
	if(count1 == 50) {
		alert('Game Over! Player1 wins!')
	} else if (count2  == 50) {
		alert('Game Over! Player2 wins!')
	} else {
		switch (event.key){
		case 'w':
		++count1
		num1 += 2
		var width1 = num1 + '%'
		$('#bar1').width(width1)
		break;
		case 'o':
		num2 += 2
		var width2 = num2 + '%'
		$('#bar2').width(width2)
		break;
		};
	}
});