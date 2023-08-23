

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

const arrayOfBtn = [btn1,btn2,btn3,
	                btn4,btn5,btn6,
	                btn7,btn8,btn9,]

const machineCombos = [[btn9,btn5,btn6,btn8],[btn8,btn5,btn7,btn9],[btn7,btn4,btn5,btn8],
	                         [btn6,btn3,btn5,btn9],[btn5,btn1,btn2,btn3,btn4,btn6,btn7,btn8,btn9],
	                         [btn4,btn1,btn5,btn7],[btn3,btn2,btn5,btn6],[btn2,btn1,btn3,btn5],
	                         [btn1,btn2,btn4,btn5] ]
const winningCombos = [[btn1,btn2,btn3], [btn4,btn5,btn6], [btn7,btn8,btn9],
	                   [btn1,btn5,btn9], [btn3,btn5,btn7], [btn1,btn4,btn7],
	                   [btn2,btn5,btn8], [btn3,btn6,btn9]]


function chooseMachineCombo(btn){
	for(let i = 0; i < machineCombos.length; i++){
		if(btn === machineCombos[i][0]){
			return machineCombos[i]
		}
	}
}


arrayOfBtn.map(element => {

	element.addEventListener("click", () =>{
		display(element)
		if (player.innerText === "Player: 2" && winner.innerText === "") {
			let availablePosibilities = chooseMachineCombo(element);
		    let freeSpace = availablePosibilities.filter(element =>{
			return  element.innerText === ""
		    })
		    if(freeSpace.length > 0){
		        const random = Math.floor(Math.random() * freeSpace.length);
		        display(freeSpace[random]);
	        }
		}
		
		
	})
})
 

restart.addEventListener("click", () =>{

	player.innerText = "Player: 1"
	winner.innerText = ""

	for(let i = 0; i < arrayOfBtn.length; i++){
		arrayOfBtn[i].disabled = false;
		arrayOfBtn[i].innerText = "";
	}

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
	game()
	btn.disabled = true
}



function disable(){

	for(let i = 0; i< arrayOfBtn.length; i++){
		arrayOfBtn[i].disabled = true
	}
}

function game(){

	winningCombos.map(element =>{

		if(element[0].innerText === element[1].innerText &&
		   element[1].innerText === element[2].innerText &&
		   element[0].innerText !== "" &&
		   element[1].innerText !== "" &&
		   element[2].innerText !== ""  ){

		   	if(player.innerText === "Player: 2"){
			    winner.innerText = "(Player 1)  is the winner"
			     player.innerText = "Player: 1"
		    }
		    else{
		        winner.innerText = "(Player 2)  is the winner"	
		        player.innerText = "Player: 2"
		    }
		    disable()
		}
	})

}

// win with (1,2,3) or (4,5,6) or (7,8,9) or (1,5,9) or (3,5,7)
// or (1,4,7) or (2,5,8) or (3,6,9)