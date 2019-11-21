import axios from "axios";
export default {
    user: {
        //login: (credentials) => axios.post('https://deti-engsoft-02:3000/login', credentials).then(res => res.data.user),
        login: (credentials) => axios.get('https://eneeb.aneeb.pt/wp-json/wp/v2/users', credentials).then(res => res.data.id),
    }
};
