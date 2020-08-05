import { base_url } from "./ObjectApi";
import axios from "axios";


const getAllBooking = async () => {
    try {
        const data = axios.get(`${base_url}/booking-list`, {
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

const getBookingListByUserId = async (userId) => {
    try {
        const data = axios.get(`${base_url}/booking-list/${userId}`, {
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

const getBookingByInvoice = async (invoiceNo) => {
    try {
        const data = axios.get(`${base_url}/booking-detail/${invoiceNo}`, {
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


const updatePaymentStatus = async (bodyRaw) => {
    try {
        const data = axios.post(`${base_url}/booking-update-status`, bodyRaw, {
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


const getAllConfirmPayment = async() => {
    try {
        const data = axios.get(`${base_url}/confirm-payment-list`, {
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

const getConfirmPaymentByInvoice = async (invoiceNo) => {
    try {
        const data = axios.get(`${base_url}/confirm-payment-detail/${invoiceNo}`, {
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


const getAllTransactionComplete = async () => {
    try {
        const data = axios.get(`${base_url}/transaction-complate-list`, {
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

const getTransactionCompleteListByUserId = async (userId) => {
    try {
        const data = axios.get(`${base_url}/transaction-complate-list/${userId}`, {
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

const getTransactionCompleteByInvoice = async (invoiceNo) => {
    try {
        const data = axios.get(`${base_url}/transaction-complate-detail/${invoiceNo}`, {
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
    getAllBooking,
    getBookingListByUserId,
    getBookingByInvoice,
    updatePaymentStatus,
    getAllConfirmPayment,
    getConfirmPaymentByInvoice,
    getAllTransactionComplete,
    getTransactionCompleteListByUserId,
    getTransactionCompleteByInvoice
}