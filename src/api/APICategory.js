import { base_url } from "./ObjectApi";
import axios from "axios";

//#region CATEGORIES
const getCategory = async () => {
    try {
        const data = await axios.get(`${base_url}/category`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const createNewCategory = async (dataReq) => {
    try {
        const data = await axios.post(`${base_url}/category`, dataReq)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const updateCategory = async (id, dataReq) => {
    try {
        const data = await axios.put(`${base_url}/category/${id}`, dataReq)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const deleteCategory = async (id) => {
    try {
        const data = await axios.delete(`${base_url}/category/${id}`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}
//#endregion


//#region SUB CATEGORIES
const getSubCategory = async () => {
    try {
        const data = await axios.get(`${base_url}/sub-category`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const createNewSubCategory = async (dataReq) => {
    try {
        const data = await axios.post(`${base_url}/sub-category`, dataReq)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const updateSubCategory = async (id, dataReq) => {
    try {
        const data = await axios.put(`${base_url}/sub-category/${id}`, dataReq)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const deleteSubCategory = async (id) => {
    try {
        const data = await axios.delete(`${base_url}/sub-category/${id}`)

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