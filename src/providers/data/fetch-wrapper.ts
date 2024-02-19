//custom - fetch wrapped around the fetch that acts as a authorization header, request to graphql api
import {GraphQLFormattedError} from "graphql"
type Error ={
    message: string,
    statusCode: string,
}
//middleware
const customFetch = async(url:string, options:RequestInit)=>{
    const accessToken = localStorage.getItem('access_token')
    const headers = options.headers as Record<string,string>

    return await fetch(url,{
        ...options,
        headers:{
            ...headers,
            //additional header
            //?. is optional-chaining operator that evaluates to null or undefined instead of throwing an error
            Authorization:headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            //CORS ISSUE: Cross Origin Resource Sharing, Apollo is a Graphql client that resolves this issue
            "Apollo-Require-Preflight":"true",
        }
    }) 
}

const getGraphQLErrors = (body:Record<"errors", GraphQLFormattedError[] | undefined>): Error | null =>{
    if(!body){
        return {
            message:"unknown error",
            statusCode:"INTERNAL_SERVER_ERROR"
        }
    }
    if("errors" in body){
        const errors = body?.errors
        const messages = errors?.map((error)=>error?.message).join("")
        const code = errors?.[0]?.extensions?.code

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500
        }
    }
    return null
}

export const fetchWrapper = async (url:string, options:RequestInit)=>{
    const response = await customFetch(url,options)
    //special function-> responseClone
    const responseClone = response.clone()
    const body =await responseClone.json()

    const error = getGraphQLErrors(body)

    if(error){
        throw error
    }
    return response
}