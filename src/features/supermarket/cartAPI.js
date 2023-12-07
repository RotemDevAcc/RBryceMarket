// A mock function to mimic making an async request for data
import axios from "axios";

export function getProducts() {
    const MY_SERVER="127.0.0.1:8000"
    return new Promise((resolve) =>
        axios.get(MY_SERVER)
    );
  }
  