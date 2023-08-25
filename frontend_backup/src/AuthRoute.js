import Cookies from "universal-cookie";
import axios from "axios";
import { reactive } from "vue";

const store = reactive({
  is_authenticated: false
})

export default async function AuthRoute() {
    const cookies = new Cookies();
    const token = cookies.get("token");

    try {
      const response = await axios.post("http://localhost:8000/api/get-decoded-token", {
        token: token
      })
      store.is_authenticated = response.data.auth;
    } catch (error) {
      console.error(error)
    }

    return store.is_authenticated;
  }