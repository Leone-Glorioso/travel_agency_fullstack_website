// const prod={
//     url:{
//         API_BASE_URL:'http://myapp.herokuapp.com',
//     }
// }

const dev ={
    url:{
        API_BASE_URL: 'http://localhost:8080'
    }
}

export const config=dev //process.env.NODE_ENV==='development'?dev:prod