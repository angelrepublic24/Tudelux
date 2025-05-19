import axios, { isAxiosError } from "axios";

export async function getAddOn(){
    try{
        const {data} = await axios.get('https://api.hubapi.com/hubdb/api/v2/tables/116656395/rows?portalId=22465736');
        const addOns = data.objects;
        return addOns
    }catch(e){
        if(isAxiosError(e)){
            throw new Error(e.response?.data)
        }
    }
}

export async function getRoof(){
    try {
        const {data} = await axios.get('https://api.hubapi.com/hubdb/api/v2/tables/116656305/rows?portalId=22465736');
        const roof = data.objects;
        return roof        
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data)
        }
    }
}

export async function getProfile(){
    try {
        const {data} = await axios.get('https://api.hubapi.com/hubdb/api/v2/tables/116565778/rows?portalId=22465736');
        const profile = data.objects;
        return profile        
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data)
        }
    }
}

export async function getMaterials(){
    try {
        const {data} = await axios.get('https://api.hubapi.com/hubdb/api/v2/tables/116656305/rows?portalId=22465736');
        const materials = data.objects;
        return materials        
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data)
        }
    }
}

export async function getWallColor (){
    try{
        const {data} = await axios.get("https://api.hubapi.com/hubdb/api/v2/tables/5650482/rows?portalId=22465736")
        const colors = data.objects;
        return colors
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data)
        }
    }
}