import instance from "./instance";

export const getAllOrderDetail = ()=>{
    const uri = '/purchase';
    return instance.get(uri);
}