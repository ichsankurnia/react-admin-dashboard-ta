import { base_url } from "./ObjectApi";
import axios from "axios";


const getAllJasa = async () => {
    try {
        const data = await axios.get(`${base_url}/jasa`)

        console.log(data)
        return data
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)))
        return JSON.parse(JSON.stringify(error))
    }
}

const createNewJasa = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/jasa`, bodyRaw)

        return data
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)))
        return JSON.parse(JSON.stringify(error))
    }
}

const updateJasa = async (jasaId, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/jasa/${jasaId}`, bodyRaw)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const deleteJasa = async (jasaId) => {
    try {
        const data = await axios.delete(`${base_url}/jasa/${jasaId}`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


export { getAllJasa, createNewJasa, updateJasa, deleteJasa }