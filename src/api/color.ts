import instance from "./instance";

export const getColor = () => {
    return instance.get('/color')
}
export const getByColorId = (id:string | number) => {
    const uri = "/color/" +id
    return instance.get(uri)
}