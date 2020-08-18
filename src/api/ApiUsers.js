import { base_url } from "./ObjectApi";
import axios from "axios";


const postAuth = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/auth`, bodyRaw)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


const getAllUser = async () => {
    try {
        const data = await axios.get(`${base_url}/user`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


const getUserById = async (user_id) => {
    try {
        const data = await axios.get(`${base_url}/user/${user_id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const createNewUser = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/user`, bodyRaw)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const updateUser = async (user_id, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/user/${user_id}`, bodyRaw, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const deleteUser = async (user_id) => {
    try {
        const data = await axios.delete(`${base_url}/user/${user_id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


const updateAsAdmin = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/super-user`, bodyRaw, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


const updateProfile = async (bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/update-profil/`, bodyRaw, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const deleteProfilePicture = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/delete-profil-picture/`, bodyRaw, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


export {
    postAuth,
    getAllUser,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    updateAsAdmin,
    updateProfile,
    deleteProfilePicture
}