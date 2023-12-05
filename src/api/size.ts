import instance from "./instance";

export const getSize = () => {
    return instance.get('/size')
}