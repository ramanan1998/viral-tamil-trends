import axios from "axios"

export const signup = async ({ username, email }: { username: string, email: string }) => {
    return await axios({
        method: "post",
        url: "https://viral-tamil-trends-backend.onrender.com/api/auth/signup",
        data: {
            username,
            email
        }
    })
}

export const signin = async ({ password, email }: { password: string, email: string }) => {
    return await axios({
        method: "post",
        url: "https://viral-tamil-trends-backend.onrender.com/api/auth/login",
        data: {
            password,
            email
        }
    })
}

export const getUser = async ({ token }: { token: string }) => {
    return await axios({
        method: "get",
        url: "https://viral-tamil-trends-backend.onrender.com/api/user/getUser",
        headers: {
            "Authorization": token
        }
    })
}