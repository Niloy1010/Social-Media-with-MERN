import axios from 'axios';

//Set axios default header to send to any upcoming request
const setAuthToken = token => {
    if(token) {
    axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;