import { base_url } from "./ObjectApi";
import axios from "axios";


const getAllJasa = async () => {
    try {
        const data = await axios.get(`${base_url}/jasa`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)))
        return JSON.parse(JSON.stringify(error))
    }
}

const createNewJasa = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/jasa`, bodyRaw, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)))
        return JSON.parse(JSON.stringify(error))
    }
}

const updateJasa = async (jasaId, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/jasa/${jasaId}`, bodyRaw, {
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

const deleteJasa = async (jasaId) => {
    try {
        const data = await axios.delete(`${base_url}/jasa/${jasaId}`, {
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


export { getAllJasa, createNewJasa, updateJasa, deleteJasa }