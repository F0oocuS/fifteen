let app = document.getElementById('app');
let startGameBtn = document.getElementById('start-game');
let numbers = [ 
					[1, 2, 3, 4], 
					[5, 6, 7, 8], 
					[9, 10, 11, null], 
					[13, 14, 15, 12] 
				];

document.addEventListener('keydown', (e) => {
	// Arrow up
	if(e.keyCode === 38) {
		onArrowUp();
		updateCells();
	}

	// Arrow down
	if(e.keyCode === 40) {
		onArrowDown();
		updateCells();
	}

	// Arrow left
	if(e.keyCode === 37) {
		onArrowLeft();
		updateCells();
	}

	// Arrow right
	if(e.keyCode === 39) {
		onArrowRight();
		updateCells();
	}
	checkIfWin();
});

startGameBtn.addEventListener('click', () => {
	startGame();
})


function startGame() {
	app.innerHTML = null;
	randomizeArray(numbers);
	createGame();
	isGameStarted = true;
}

function randomizeArray(array) {
	let count = 0;
	let arr = array[0].concat(array[1], array[2], array[3]);
	arr.sort(() => {
		return .5 - Math.random();
	});

	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			numbers[i][j] = arr[count];
			count++
		}
	}
}

function createAndAppend(className, parrentElement, content, tag = 'div') {
	let element = document.createElement(tag);

	element.className = className;
	element.textContent = content;

	parrentElement.appendChild(element);

	return element;
}

function createGame() {
	let gameBody = createAndAppend('game__body', app);

	for(let i = 0; i < numbers.length; i++) {
		for(let j = 0; j < numbers[i].length; j++) {
			createAndAppend('game__cell', gameBody, numbers[i][j]);
		}
	}
}

function onArrowDown() {
	let emptyCell = {};
	let movedCell = {};

	for(let i = 0; i < numbers.length; i++) {
		for(let j = 0; j < numbers[i].length; j++) {
			if (numbers[i][j] === null) {
				emptyCell.xIndex = j;
				emptyCell.yIndex = i;

				movedCell.xIndex = j;
				movedCell.yIndex = i - 1;

			}
		}
	}

	if(emptyCell.yIndex > 0) {
		numbers[emptyCell.yIndex][emptyCell.xIndex] = numbers[movedCell.yIndex][movedCell.xIndex];
		numbers[movedCell.yIndex][movedCell.xIndex] = null;
	}
}

function onArrowUp() {
	let emptyCell = {};
	let movedCell = {};

	for(let i = 0; i < numbers.length; i++) {
		for(let j = 0; j < numbers[i].length; j++) {
			if (numbers[i][j] === null) {
				emptyCell.xIndex = j;
				emptyCell.yIndex = i;

				movedCell.xIndex = j;
				movedCell.yIndex = i + 1;

			}
		}
	}

	if(emptyCell.yIndex < 3) {
		numbers[emptyCell.yIndex][emptyCell.xIndex] = numbers[movedCell.yIndex][movedCell.xIndex];
		numbers[movedCell.yIndex][movedCell.xIndex] = null;
	}
}

function onArrowRight() {
	let emptyCell = {};
	let movedCell = {};

	for(let i = 0; i < numbers.length; i++) {
		for(let j = 0; j < numbers[i].length; j++) {
			if (numbers[i][j] === null) {
				emptyCell.xIndex = j;
				emptyCell.yIndex = i;

				movedCell.xIndex = j - 1;
				movedCell.yIndex = i;

			}
		}
	}

	if(emptyCell.xIndex > 0) {
		numbers[emptyCell.yIndex][emptyCell.xIndex] = numbers[movedCell.yIndex][movedCell.xIndex];
		numbers[movedCell.yIndex][movedCell.xIndex] = null;
	}
}

function onArrowLeft() {
	let emptyCell = {};
	let movedCell = {};

	for(let i = 0; i < numbers.length; i++) {
		for(let j = 0; j < numbers[i].length; j++) {
			if (numbers[i][j] === null) {
				emptyCell.xIndex = j;
				emptyCell.yIndex = i;

				movedCell.xIndex = j + 1;
				movedCell.yIndex = i;

			}
		}
	}

	if(emptyCell.xIndex < 3) {
		numbers[emptyCell.yIndex][emptyCell.xIndex] = numbers[movedCell.yIndex][movedCell.xIndex];
		numbers[movedCell.yIndex][movedCell.xIndex] = null;
	}
}

function updateCells() {
	let cells = document.getElementsByClassName('game__cell');

	for(let i = 0; i < cells.length; i++) {
		cells[i].textContent = takeArrayItem(i);
	}
}

function takeArrayItem(index) {
	let array = [];

	for(let i = 0; i < numbers.length; i++) {
		for(let j = 0; j < numbers[i].length; j++) {
			array.push(numbers[i][j]);
		}
	}

	return array[index];
}

function checkIfWin() {
	let neededArray = [
						[1, 2, 3, 4],
						[5, 6, 7, 8],
						[9, 10, 11, 12],
						[13, 14, 15, null]
					]

	if(JSON.stringify(neededArray) === JSON.stringify(numbers)) {
		setTimeout(() => {
			alert('Congratulation! YOU will!')
		}, 0); 
	}
}