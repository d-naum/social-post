import { UserForm } from "~/components/UserForm";
import {json, redirect}from '@remix-run/node';
import type {ActionFunction} from '@remix-run/node';
import { checkUserExists, userSignup } from "~/services/users.server";
import { useActionData } from "@remix-run/react";
import {Button} from '~/components/Button';
import {useTransition} from '@remix-run/react';
import {Signup} from '~/services/validations'

type ActionData={
    error?:{
        formErrors?:string[]
        fieldErrors?:{
          email?:string[]
          password?:string[]
        }
      }
    fields?:{
    email?:string
    password?:string
    }
}

export function badRequest<TActionData>(data: TActionData, status=400){
    return json<TActionData>(data,{status})
}

export const action: ActionFunction= async({request})=>{
    const form= await request.formData()
    const rawEmail=form.get('email');
    const rawPassword= form.get('password')
    if(typeof rawEmail!== 'string' || typeof rawPassword !== 'string'){
        return badRequest<ActionData>({
            error: {
                formErrors:[`form not submitted correctly`]
            }
        })
    }
    const fields={email:rawEmail,password:rawPassword}
    const result=  Signup.safeParse({
        email:rawEmail,
        password:rawPassword
    })
    if(!result.success){
        const error= result.error.flatten()
        return badRequest<ActionData>({fields,error})
    }
    const userExists= await checkUserExists(result.data.email)
    if(userExists){
        return badRequest<ActionData>({fields,error:{formErrors:[`User with ${rawEmail} already exists`]}})
    }
    const user= await userSignup(result.data.email,result.data.password);
    if(user){
        return redirect('/login')
    }
    else
    return badRequest<ActionData>({fields,error:{formErrors:[`Something bad happen`]}})
}

function SignupPage(){
    const{ error, fields}=useActionData<ActionData>()??{}
    const transition=useTransition();
    return(
        <div>
            <h1 className="text-xl text-slate-800">Sign Up</h1>
            <UserForm error={error} fields={fields}>
            <Button type="submit" disabled={
                transition.state !=='idle'
            }>{transition.state==='idle' ? 'Signup':'Signing up...'}</Button>
            </UserForm>
        </div>
    ) 
}

export default SignupPage;