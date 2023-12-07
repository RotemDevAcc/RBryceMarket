import axios from 'axios'

export function fetchProducts() {
    const MY_SERVER = 'http://127.0.0.1:8000/productslist/'
    return axios.get(MY_SERVER)
}