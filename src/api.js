import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post('https://iesapi.herokuapp.com/login', credentials).then(res => res.data.token),
    }
};
