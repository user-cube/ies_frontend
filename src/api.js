import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post('http://localhost:3000/login', credentials).then(res => res.data.token),
    }
};
