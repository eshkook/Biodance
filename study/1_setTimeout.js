setTimeout(() => {       // this is asynchronous function, as the later code will run and not wait for this to end
                         // thus later code better not be dependent on this chunk of code
    console.log(77777777777)
    setTimeout(() => {
        console.log(8888888888)
                     }, 1000)
    console.log(99999999999)
                 }, 1000) // 1 seconds delay before excecuting the function's content, as the units are miliseconds

console.log(222)

function one(call) {
    call() // this is a 'callback'
    // two() // this works, then what's the point giving it in the input of function 'one'? 
          // an atvantage of a callback is if the input function changes its name, 
          // it saves the need to change it at each appearence inside function 'one'
    console.log('fun 1')
}

function two() {
    console.log('fun 2')
}

one(two)
