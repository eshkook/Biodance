let topping_choice = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('which topping do you want?'))
                         }, 3000)
                                             })
}

async function kitchen() { // when calling this function, it will run in parallel to the code that comes after it  
    console.log(1)
    console.log(2)
    console.log(3)
    await topping_choice() // the await makes this line wait until done before moving to the next, which isn't trivial, as
                           // this line contains the ansychronous function setTimeout inside it
    console.log(4)
    console.log(5)

}

kitchen()

console.log('clean dishes')
console.log('clean tables')

















