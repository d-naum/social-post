import { UserForm } from "~/components/UserForm";
import {useLoaderData, useTransition} from '@remix-run/react';
import {Button} from '~/components/Button';
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticator, USER_LOGIN } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
type LoaderData={
    error?:{
        formErrors:string[]
    }
}
export const action: ActionFunction=async ({request}) => {
    return await authenticator.authenticate(USER_LOGIN,request,{
        successRedirect:'/',
        throwOnError:true,
        failureRedirect:'/login'
    })
}

export let loader:LoaderFunction=async ({request}) => {
    await authenticator.isAuthenticated(request,{
        successRedirect:'/'
    })
    let session= await getSession(request.headers.get('cookie'))
    let error= session.get(authenticator.sessionErrorKey)as Error[] | Error
    if(error){
        return json({
            error:{
                formErors:[`unable to login with those credentials, Please try again`]
            }
        })
    } else{
        return {}
    }
}
function Login(){
    const {error}= useLoaderData<LoaderData>()
    const transition=useTransition();
    return(
        <div>
            <h1 className="text-xl text-slate-800">Login</h1>
            <UserForm error={error}>
            <Button type="submit" disabled={
                transition.state !=='idle'
            }>{transition.state==='idle' ? 'login':'logging in...'}</Button>
            </UserForm>
        </div>
    ) 
}

export default Login;