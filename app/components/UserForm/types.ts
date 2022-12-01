import type { ComponentPropsWithoutRef } from "react";
export type Props=ComponentPropsWithoutRef<'form'>& {
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