//119 W
//111 O

//Take keyboard inputs and progress the bars
var num1 = 0
var num2 = 0

window.addEventListener('keydown', function(event){
	console.log($('#bar1').css('width'))
	if($('#bar1').width() == '100%' || $('#bar2').width() == '100%') {
		alert('Game Over!')
	} else {
		switch (event.key){
		case 'w':
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