let red = document.getElementById('red')
let green = document.getElementById('green')
let blue = document.getElementById('blue')
let pen = document.getElementById('pen')
let eraser = document.getElementById('eraser')
let clear = document.getElementById('clear')
let download = document.getElementById('download')

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let lineWidth = 5

// 初始化画布
autoSetCanvasSize(canvas)
listenToUser(canvas)

var eraserEnabled = false

pen.onclick = function () {
	eraserEnabled = false
	pen.classList.add('active')
	eraser.classList.remove('active')
}

eraser.onclick = function () {
	eraserEnabled = true
	eraser.classList.add('active')
	pen.classList.remove('active')
}

clear.onclick = function () {
	context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function () {
	var url = canvas.toDataURL('image/png')
	var a = document.createElement('a')
	document.body.appendChild(a)
	a.href = url
	a.download = '我的画'
	a.target = '_blank'
	a.click()
}

// function drawCircle(x, y, radius) {
// 	context.beginPath()
// 	context.arc(x, y, radius, 0, Math.PI*2)
// 	context.fill()
// }

function drawLine(x1, y1, x2, y2) {
	context.beginPath()
	context.moveTo(x1, y1) // 起点
	context.lineWidth = lineWidth
	context.lineTo(x2, y2) // 终点
	context.stroke()
	context.closePath()
}

// 对颜色添加事件
red.onclick = function () {
	context.fillStyle = 'red'
	context.strokeStyle = 'red'
	red.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
}

green.onclick = function () {
	context.fillStyle = 'green'
	context.strokeStyle = 'green'
	green.classList.add('active')
	red.classList.remove('active')
	blue.classList.remove('active')
}

blue.onclick = function () {
	context.fillStyle = 'blue'
	context.strokeStyle = 'blue'
	blue.classList.add('active')
	green.classList.remove('active')
	red.classList.remove('active')
}
// 对颜色添加事件的事件委托
// colors.addEventListener('click', function (e) {

// 	if (e.target && e.target.nodeName.toLowerCase() == 'li') {
// 		var classNames = e.target.className.split(' ')
// 		for (var i = 0; i < classNames.length; i++) {
// 			if (classNames[i] == 'red') {
// 				context.fillStyle = 'red'
// 				context.strokeStyle = 'red'
// 				red.classList.add('active')
// 				green.classList.remove('active')
// 				blue.classList.remove('active')
// 			} else if (classNames[i] == 'green') {
// 				context.fillStyle = 'green'
// 				context.strokeStyle = 'green'
// 				green.classList.add('active')
// 				red.classList.remove('active')
// 				blue.classList.remove('active')
// 			} else if (classNames[i] == 'blue') {
// 				context.fillStyle = 'blue'
// 				context.strokeStyle = 'blue'
// 				blue.classList.add('active')
// 				green.classList.remove('active')
// 				red.classList.remove('active')
// 			}
// 		}
// 	}
// })

// 设置画笔的粗细
thin.onclick = function () {
	lineWidth = 5
}

thick.onclick = function () {
	lineWidth = 10
}

// 设置画布的大小
function autoSetCanvasSize(canvas) {
	setCanvasSize()

	window.onresize = function () {
		setCanvasSize()
	}

	function setCanvasSize() {
		var pageWidth = document.documentElement.clientWidth
		var pageHeight = document.documentElement.clientHeight

		canvas.width = pageWidth
		canvas.height = pageHeight
	}
}

// 监听画笔
function listenToUser(canvas) {
	let using = false
	var lastPoint = {
		x: undefined,
		y: undefined
	}

	canvas.onmousedown = function (aaa) {
		var x = aaa.clientX
		var y = aaa.clientY
		using = true
		if (eraserEnabled) {
			context.clearRect(x-5, y-5, 10, 10)
		} else {
			lastPoint = {
				'x': x,
				'y': y
			}
		}
	}
	canvas.onmousemove = function (aaa) {
		var x = aaa.clientX
		var y = aaa.clientY
		if (!using) {
			return
		}
		if (eraserEnabled) {
			context.clearRect(x-5, y-5, 10, 10)
		} else {
			var newPoint = {
				'x': x,
				'y': y
			}
			drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
			lastPoint = newPoint
		}
	}
	canvas.onmouseup = function () {
		using = false
	}
}

