import axios from 'axios';
const registerNewUser = (email, phoneNumber, username, password) => {
    return axios.post('http://localhost:8000/api/v1/register', {
        email, phoneNumber, username, password
    })
}
const handleLoginService = (valueLogin, password) => {
    return axios.post('http://localhost:8000/api/v1/login', { valueLogin, password })
}
const fetchUsersService = (page, limit) => {
    return axios.get(`http://localhost:8000/api/v1/user/read?page=${page}&limit=${limit}`,)
}
const deleteUserService = (user) => {
    return axios.delete("http://localhost:8000/api/v1/user/delete", { data: { id: user.id } })
}
const fetchAllGroup = () => {
    return axios.get("http://localhost:8000/api/v1/group/read")
}
const createNewUser = (userData) => {
    return axios.post('http://localhost:8000/api/v1/user/create', { data: userData })
}
export {
    registerNewUser, handleLoginService, fetchUsersService, deleteUserService, fetchAllGroup,
    createNewUser
}