function time(ms) {
    return new Promise( (resolve, reject) => {
        if (is_shop_open && fruit_index < stock.fruits.length && topping_index < stock.toppings.length) {
            setTimeout(resolve, ms)
        } else {
            reject(console.log('shop is closed or either fruit or topping doesn\'t exist'))    
                                                                                                        }
                                             })
}

// assuming preparing ice cream is the following process one by one(no asynchronous actions):
// 1. taking the fruit out of fridge takes 2 seconds
// 2. reporting that the process itself begins takes 0 seconds
// 3. cutting the fruit takes 3 seconds
// 4. add topping takes 1 second

async function kitchen() {
    try {
        await time(2000) // why check each time if shop is open? because in other code maybe in the meantime somthing changed
        console.log(`${stock.fruits[fruit_index]} was cut`)
        await time(0)
        console.log('production has started')
        await time(3000)
        console.log(`${stock.fruits[fruit_index]} was cut`)
        await time(1000)
        console.log(`${stock.toppings[topping_index]} was added`)

    } catch(error) {
        console.log('customer left')
        }
    finally {
        console.log('day ended, shop is closed')
    }
}

let stock = {
    fruits: ['lemon', 'strawberry'],
    toppings: ['chocolate', 'vanila']
}
let is_shop_open = true
let fruit_index = 0
let topping_index = 1

kitchen()

console.log('clean dishes')
console.log('clean tables')