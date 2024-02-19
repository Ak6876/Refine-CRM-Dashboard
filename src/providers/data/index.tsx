import { GraphQLClient } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";

export const API_URL = 'https://api.crm.refine.dev'

export const client = new GraphQLClient(API_URL,{
    //fetch query: Callback function
    //RequestInit: built-in interface
    fetch:(url:string, options:RequestInit)=>{
        try {
            //successful request
            return fetchWrapper(url,options)
        } catch (error) {
            return Promise.reject(error as Error)
        }
    }
})