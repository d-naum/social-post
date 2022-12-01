import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { commitSession, getSession, destroySession } from "./session.server";
import { userLogin } from "./users.server";
import { Login } from "./validations";
export type SessionUser=Omit<User, 'hashedPassword'>
export const USER_LOGIN='user-login'
export const authenticator= new Authenticator<SessionUser>({
    commitSession,
    getSession,
    destroySession
})
authenticator.use(
    new FormStrategy(async({form,context})=>{
        const rawEmail=form.get('email')
        const rawPassword=form.get('password')
        const {email,password}=Login.parse({
            email:rawEmail,
            password:rawPassword,
        })
        const user=await userLogin(email,password)
        return user
    }), USER_LOGIN
)


