import api from "../../utils/axios.js";


// Function to get the current user from the backend
const getCurrentUser = async () => {
    try {
        const {data} = await api.get("api/me");     
        return data;
    }catch (error) {
        console.error("Failed to get current user:", error);
        return null; // Return null if there's an error
    }
}

export default getCurrentUser;