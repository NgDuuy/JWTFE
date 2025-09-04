// import axios from 'axios';
import axios from '../setup/axios'
const registerNewUser = (email, phoneNumber, username, password) => {
    return axios.post('/api/v1/register', {
        email, phoneNumber, username, password
    })
}
const handleLoginService = (valueLogin, password) => {
    return axios.post('/api/v1/login', { valueLogin, password })
}
const fetchUsersService = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`,)
}
const deleteUserService = (user) => {
    return axios.delete("/api/v1/user/delete", { data: { id: user.id } })
}
const fetchAllGroup = () => {
    return axios.get("/api/v1/group/read")
}
const createNewUser = (userData) => {
    return axios.post('/api/v1/user/create', { data: userData })
}
const updateCurrentUser = (userData) => {
    return axios.put('/api/v1/user/update', { ...userData })
}
const getUserAccount = () => {
    return axios.get('/api/v1/account')
}
export {
    registerNewUser, handleLoginService, fetchUsersService, deleteUserService, fetchAllGroup,
    createNewUser, updateCurrentUser, getUserAccount
}