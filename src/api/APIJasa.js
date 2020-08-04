import { base_url } from "./ObjectApi";
import axios from "axios";


const getAllJasa = async () => {
    try {
        const data = await axios.get(`${base_url}/jasa`)

        return data
    } catch (error) {
        return error.message
    }
}

const createNewJasa = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/jasa`, bodyRaw)

        return data
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)))
        return error.message
    }
}

const updateJasa = async (jasaId, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/jasa/${jasaId}`, bodyRaw)

        return data
    } catch (error) {
        return error.message
    }
}

const deleteJasa = async (jasaId) => {
    try {
        const data = await axios.delete(`${base_url}/jasa/${jasaId}`)

        return data
    } catch (error) {
        return error.message
    }
}


export { getAllJasa, createNewJasa, updateJasa, deleteJasa }