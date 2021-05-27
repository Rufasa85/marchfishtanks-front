const axios = require("axios")
// const URL_PREFIX = "http://localhost:3001"
const URL_PREFIX = "https://marchfishback.herokuapp.com"

const API = {
    login: function (userData) {
        return axios.post(`${URL_PREFIX}/login`, userData)
    },
    signup: function (userData) {
        return axios.post(`${URL_PREFIX}/signup`, userData)
    },
    getProfile: function (token) {
        return axios.get(`${URL_PREFIX}/profile`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    },
    getMyTanks: function (token) {
        return axios.get(`${URL_PREFIX}/profile`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    },
    getAllTanks: function () {
        return axios.get(`${URL_PREFIX}/api/tanks`);
    },
    getOneTank: function (id, token) {
        return axios.get(`${URL_PREFIX}/api/tanks/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    createTank: function (data, token) {
        return axios.post(`${URL_PREFIX}/api/tanks/`, data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    editTank: function (data, id, token) {
        return axios.put(`${URL_PREFIX}/api/tanks/${id}`, data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    deleteTank: function (id, token) {
        return axios.delete(`${URL_PREFIX}/api/tanks/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    createFish: function (data, token) {
        return axios.post(`${URL_PREFIX}/api/fishes/`, data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    editFish: function (data, id, token) {
        return axios.put(`${URL_PREFIX}/api/fishes/${id}`, data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    deleteFish: function (id, token) {
        return axios.delete(`${URL_PREFIX}/api/fishes/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }
}

export default API