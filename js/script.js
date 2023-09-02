document.addEventListener('DOMContentLoaded', () => {

let btn1  = document.getElementById("btn_1")
let btn2  = document.getElementById("btn_2")
let btn3  = document.getElementById("btn_3")
let btn4  = document.getElementById("btn_4")
let btn5  = document.getElementById("btn_5")
let btn6  = document.getElementById("btn_6")
let btn7  = document.getElementById("btn_7")
let btn8  = document.getElementById("btn_8")
let btn9  = document.getElementById("btn_9")


let player = document.getElementById("player")
let restart = document.getElementById("btn_restart")
let winner = document.getElementById("winner")


let scoreX = document.getElementById("score_sub_X")
let scoreO = document.getElementById("score_sub_O")
let resetBtn = document.getElementById("reset_button")

const arrayOfBtn = [btn1,btn2,btn3,
	                btn4,btn5,btn6,
	                btn7,btn8,btn9,]

const winningCombos = [[btn1,btn2,btn3], [btn4,btn5,btn6], [btn7,btn8,btn9],
	                   [btn1,btn5,btn9], [btn3,btn5,btn7], [btn1,btn4,btn7],
	                   [btn2,btn5,btn8], [btn3,btn6,btn9]]

let freeSpace = arrayOfBtn.length

let initialScore = [0,0]


const key = localStorage.key("score")
let st = JSON.parse(localStorage.getItem(key))

if(st){
	initialScore = st

	scoreX.innerText = initialScore[0]
	scoreO.innerText = initialScore[1]
}


function checkCombo(btn){
	let help = []
	winningCombos.map(element =>{

		if(element[0].innerText === element[1].innerText 
			&& element[0].innerText !== "" 
			&& element[1].innerText !== ""){

			if(element[2].innerText === ""){
				help.push(element[2])
			}
		}
		else if(element[1].innerText === element[2].innerText 
			&& element[1].innerText !== "" 
			&& element[2].innerText !== "" ){

			if(element[0].innerText === ""){
				help.push(element[0])
			}
		}
		else if(element[0].innerText === element[2].innerText 
			&& element[0].innerText !== "" 
			&& element[2].innerText !== "" ){
			
			if(element[1].innerText === ""){
				help.push(element[1])
			}
		}

	})
	if(help.length > 0){
		const random = Math.floor(Math.random() * help.length);
		display(help[random]);
	}
	else{ 

		while(freeSpace > 0){
			const random = Math.floor(Math.random() * arrayOfBtn.length)
			if(arrayOfBtn[random].innerText === ""){
				display(arrayOfBtn[random])
				break;
			}
		}
	}
}


arrayOfBtn.map(element => {

	element.addEventListener("click", () =>{
		display(element)
		if (player.innerText === "Player: 2" && winner.innerText === "") {

	        setTimeout(()=>{checkCombo(element)},900)
		}
		if(freeSpace === 0){
		    winner.style.color = "orange"
		    winner.innerText = "No WINNER !!!"
		    player.innerText = ""
	    }
	})
})
 

restart.addEventListener("click", () =>{
	location.reload()
})

resetBtn.addEventListener("click", () => {
	initialScore = [0,0]
	let storeScore = JSON.stringify(initialScore)
	localStorage.setItem("score",storeScore)
	location.reload()
})

function display(btn){

	if(player.innerText === "Player: 1"){
		if(btn.innerText === "" && winner.innerText === ""){
		    btn.innerText = "x"
		    player.innerText = "Player: 2"
	    }
	}
	else{
		if(btn.innerText === "" && winner.innerText === ""){
		    btn.innerText = "o"
		    player.innerText = "Player: 1"
	    }
	}
	freeSpace--
	game()
	btn.disabled = true
}


function disable(){

	for(let i = 0; i< arrayOfBtn.length; i++){
		arrayOfBtn[i].disabled = true
	}
}

function colorBox(array,color){
	array.map(e => {
		e.style.backgroundColor = color
	})
}

function calcScore(element){

	if(element === "player1"){
		initialScore[0] += 1
		scoreX.innerText = initialScore[0]
	}
	else{
		initialScore[1] += 1
		scoreO.innerText = initialScore[1]
	}

	let storeScore = JSON.stringify(initialScore)
	localStorage.setItem("score",storeScore)
}

function game(){

	winningCombos.map(element =>{

		if(element[0].innerText === element[1].innerText &&
		   element[1].innerText === element[2].innerText &&
		   element[0].innerText !== "" &&
		   element[1].innerText !== "" &&
		   element[2].innerText !== ""  ){

		   	if(player.innerText === "Player: 2"){
			    winner.innerText = "YOU WIN !!!"
			    colorBox(element,"royalblue")
			    player.innerText = ""
			    calcScore("player1")
		    }
		    else{
		    	winner.style.color = "red"
		        winner.innerText = "YOU LOST !!!"
		        colorBox(element,"red")	
		        player.innerText = ""
		        calcScore("player2")
		    }
		    disable()
		}
	})

}
})
// win with (1,2,3) or (4,5,6) or (7,8,9) or (1,5,9) or (3,5,7)
// or (1,4,7) or (2,5,8) or (3,6,9)