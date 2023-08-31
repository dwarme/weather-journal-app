async function weatherDataFetch() {

}

async function userFeedbackList() {

}

async function userFeedbackAdd() {

}


const API = {
    weather: {
        data: weatherDataFetch
    },
    userFeedback: {
        list: userFeedbackList,
        add: userFeedbackAdd
    }
}

export default API;