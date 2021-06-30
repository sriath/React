this.onmessage = (e) => {
	// console.log('worker.js: Message received from main script', e.data)
	const val = 0;
	let arr = [];
	for (let i=0; i <= e.data; i++) {
		if (i === 0 || i === 1) {
			arr = [...arr, i]
		} if (i === 2) {
			arr = [...arr, 1]
		} else if (i > 2){
			console.log(arr, i)
			arr.push(arr[i-1]+arr[i-2])
		}
	}
	this.postMessage(`Fibonaci series ${arr}`)
}


