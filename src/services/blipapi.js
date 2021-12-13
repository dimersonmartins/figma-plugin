import axios from "axios";
const api = axios.create({ baseURL: 'https://http.msging.net' });

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function Tracking(category, rageDate) {
   return new Promise((resolve, reject) => {
        const parameter = encodeURIComponent(category)
        const uri = "/event-track/" + parameter + rageDate;
        api.post("commands",
            {
                "id": uuidv4(),
                "to": "postmaster@analytics.msging.net",
                "method": "get",
                "uri": uri
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Key dGFrZWNlbHVsYXRvcm9udG86dk16MGRSaVRueDd3OEZnSEVXOXU="
                }
            })
            .then((resp) => {
                resolve(resp)
            })
            .catch((error) => {
                reject(error)
            });
    })
}


export default {
    Tracking
}