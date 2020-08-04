import { base_url } from "./ObjectApi";
import axios from "axios";


const getAllUser = async () => {
    try {
        const data = await axios.get(`${base_url}/user`)

        return data
    } catch (error) {
        return error.message
    }
}


const getUserById = async (user_id) => {
    try {
        const data = await axios.get(`${base_url}/user/${user_id}`)

        return data
    } catch (error) {
        return error.message
    }
}

const createNewUser = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/user`, bodyRaw)

        return data
    } catch (error) {
        return error.message
    }
}

const updateUser = async (user_id, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/user/${user_id}`, bodyRaw)

        return data
    } catch (error) {
        return error.message
    }
}

const deleteUser = async (user_id) => {
    try {
        const data = await axios.delete(`${base_url}/user/${user_id}`)

        return data
    } catch (error) {
        return error.message
    }
}


const updateAsAdmin = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/super-user`, bodyRaw)

        return data
    } catch (error) {
        return error.message
    }
}

export {
    getAllUser,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    updateAsAdmin
}