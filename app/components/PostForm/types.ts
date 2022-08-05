import type { ComponentPropsWithoutRef } from "react";
export type Props=ComponentPropsWithoutRef<'form'>& {
    error?:{
        formErrors?:string[]
        fieldErrors?:{
          title?:string[]
          body?:string[]
        }
      }
    fields?:{
    title?:string
    body?:string
    }
}