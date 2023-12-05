import instance from "./instance"

export const signin = (data: { email: string, password: string }) => {
    return instance.post('/signin', data)
}

export const signup = (data: { name: string, email: string, password: string, confirmPassword: string }) => {
    return instance.post('/signup', data)
}