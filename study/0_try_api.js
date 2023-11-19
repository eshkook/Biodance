// const axios = require('axios')
// fetch("http://swapi.dev/api/people/1")
//   .then(res => res.json())
//   .then(data => console.log(data))

// fetch("http://api.imgflip.com/get_memes")
// .then(res => res.json())
// .then(data => console.log(data.data.memes[0].url)) 
// .then(() => console.log(7)) // what is the difference between 'console.log(7)' and '() => console.log(7)'?
//                             // '() => console.log(7)' is a function, that will bw resolved only when the promise it 
//                             // is attatched to is resolved. on the other hand, 'console.log(7)' is not a function but a function call,
//                             // which must excecute as the code reaches it

// fetch("http://127.0.0.1:8000/api/rooms/4/")
// .then(res => res.json())
// .then(data => console.log(data)) 

// let getRoom = async () => {
//     let response = await fetch('http://127.0.0.1:8000/api/rooms/499/')
//     let rooms = await response.json()
//     console.log(rooms)
// }

// getRoom()

// fetch("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/1")
// .then(res => res.json())
// .then(data => console.log(data)) 

// axios
//     .get('http://127.0.0.1:8000/api/image/', { timeout: 5000 }) 
//     // .then(res => res.json()) 
//     .then(data => console.log(data.data))

// fetch("https://api.imgflip.com/get_memes")
//       .then(res => res.json()) // note that '.json()' is an ansynchronous function 
//       .then(data => {  // to use async instead the 'then's look at the comment below
//         const mappedMemes = data.data.memes.map(meme => ({id: meme.id, url: meme.url})) // this command will not be skipped until finished, 
//                                                                   // unlike setting states which is asynchronous
//         const fs = require('fs'); // Only if using Node.js

//         let jsonString = JSON.stringify(mappedMemes, null, 4); // the arguments null and 4 are for pretty printing

//         // Save to a file (for Node.js)
//         fs.writeFileSync('data.json', jsonString, 'utf8');
//       })
// a={w:1}
// console.log(null.ww==9)

// const url = 'https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function'; // Replace with your API Gateway URL

// fetch(url, {
//     method: 'POST', // or 'GET', depending on your Lambda function's configuration
//     // headers: {
//     //     'Content-Type': 'application/json',
//     //     // Add any other headers your API requires
//     // },
//     // body: JSON.stringify({
//     //     // Your request body content, if needed for POST requests
//     // }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));
// const axios = require('axios');

// axios
//     .post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function",
//         {
//             email: 1,
//             password: 1,
//             hobbies: 1,
//             age: 1
//         },
//         //{
//         //   headers: { '???????????': '?????????????' } 
//         // }
//     )
//     .then(res => console.log(res.data))
//     .catch(error => {
//         // Propagate the error to react-query
//         throw error.response ? error.response.data : new Error('Network error');
//     });

// const axios = require('axios');

// axios
//     .post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//         email: 1,
//         password: 1,
//         hobbies: 1,
//         age: 1
//     })
//     .then(res => console.log(res.data))
//     .catch(error => {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.error("Error response:", error.response.data);
//             console.error("Error status:", error.response.status);
//             console.error("Error headers:", error.response.headers);
//         } else if (error.request) {
//             // The request was made but no response was received
//             console.error("Error request:", error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error('Error', error.message);
//         }
//         console.error("Error config:", error.config);
//     });
console.log(isNaN('t'))