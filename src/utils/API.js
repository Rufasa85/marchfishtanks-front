const axios = require("axios")
// const URL_PREFIX = "http://localhost:3001"
const URL_PREFIX = "https://marchfishback.herokuapp.com"

const API = {
    login:function(userData){
        return axios.post(`${URL_PREFIX}/login`,userData)
    },
    signup:function(userData){
        return axios.post(`${URL_PREFIX}/signup`,userData)
    },
    getProfile: function(token){
        return axios.get(`${URL_PREFIX}/profile`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
    }
}

export default API