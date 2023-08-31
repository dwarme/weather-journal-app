async function weatherDataFetch(url) {
    const response = await fetch(url);
    if(response.status !== 200) {
        throw new Error("An error occured");
    }

    return response.json();
}

async function userFeedbackAll() {
    const response = await fetch('/all');
    if(response.status !== 200) {
        throw new Error('An error occured');
    }

    return response.json();
}

async function userFeedbackAdd({date, temp, feelings}) {
    const payload = JSON.stringify({date, temp, feelings});
    const response = await fetch('/add', {
        method: 'POST',
        body: payload,
        headers: {
            'content-type': 'application/json'
        }
    });

    if(response.status !== 201) {
        throw new Error('An error occured')
    }
}


const API = {
    weather: {
        data: weatherDataFetch
    },
    userFeedback: {
        list: userFeedbackAll,
        add: userFeedbackAdd
    }
}

export default API;