import { base_url } from "./ObjectApi";
import axios from "axios";

//#region CATEGORIES
const getCategory = async () => {
    try {
        const data = await axios.get(`${base_url}/category`, {
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

const createNewCategory = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/category`, bodyRaw, {
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

const updateCategory = async (id, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/category/${id}`, bodyRaw, {
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

const deleteCategory = async (id) => {
    try {
        const data = await axios.delete(`${base_url}/category/${id}`, {
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
//#endregion


//#region SUB CATEGORIES
const getSubCategory = async () => {
    try {
        const data = await axios.get(`${base_url}/sub-category`, {
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

const createNewSubCategory = async (bodyRaw) => {
    try {
        const data = await axios.post(`${base_url}/sub-category`, bodyRaw, {
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

const updateSubCategory = async (id, bodyRaw) => {
    try {
        const data = await axios.put(`${base_url}/sub-category/${id}`, bodyRaw, {
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

const deleteSubCategory = async (id) => {
    try {
        const data = await axios.delete(`${base_url}/sub-category/${id}`, {
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
//#endregion


export {
    getCategory, createNewCategory, updateCategory, deleteCategory,
    getSubCategory, createNewSubCategory, updateSubCategory, deleteSubCategory
}