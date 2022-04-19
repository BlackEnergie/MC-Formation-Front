import axios from 'axios';

const Base_URL = 'http://localhost:8080'

export default axios.create({
    base_URL:Base_URL
});