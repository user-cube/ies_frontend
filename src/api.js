import axios from "axios";
export default {
    user: {
        login: (credentials) => axios.post('http://deti-engsoft-02.ua.pt:3000/login', credentials).then(res => res.data.token),
    }
};
