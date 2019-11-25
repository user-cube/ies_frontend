import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post('http://deti-engsoft-ua.pt:3000/login', credentials).then(res => res.data.token),
    }
};
