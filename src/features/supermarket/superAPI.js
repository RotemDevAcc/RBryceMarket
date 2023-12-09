import axios from 'axios'
import { TargetServer } from '../settings/Settings';
export function fetchProducts() {
    const MY_SERVER = `${TargetServer}productslist/`
    return axios.get(MY_SERVER)
}