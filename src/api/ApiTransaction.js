import { base_url } from "./ObjectApi";
import axios from "axios";


const getAllBooking = async () => {
    try {
        const data = axios.get(`${base_url}/booking-list`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const getBookingListByUserId = async (userId) => {
    try {
        const data = axios.get(`${base_url}/booking-list/${userId}`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const getBookingByInvoice = async (invoiceNo) => {
    try {
        const data = axios.get(`${base_url}/booking/${invoiceNo}`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}


const updatePaymentStatus = async (bodyRaw) => {
    try {
        const data = axios.post(`${base_url}/booking-update-status`, bodyRaw)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))        
    }
}


const getTransactionComplete = async () => {
    try {
        const data = axios.get(`${base_url}/payment-complate-list`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const getTransactionCompleteListByUserId = async (userId) => {
    try {
        const data = axios.get(`${base_url}/payment-complate-list/${userId}`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

const getTransactionCompleteByInvoice = async (invoiceNo) => {
    try {
        const data = axios.get(`${base_url}/payment-complate/${invoiceNo}`)

        return data
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}



export {
    getAllBooking,
    getBookingListByUserId,
    getBookingByInvoice,
    updatePaymentStatus,
    getTransactionComplete,
    getTransactionCompleteListByUserId,
    getTransactionCompleteByInvoice
}