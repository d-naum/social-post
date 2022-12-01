import {Form} from '@remix-run/react';

import type {Props} from './types';
function UserForm({error, fields,children, method='post,',...props}: Props){
    
    return(
        <Form method='post' {...props}  className={"flex flex-col gap-4"}
        >
            <div>
                <label htmlFor='email'
                className='mb-2'>Email</label>
                <input 
                defaultValue={fields?.email}
                type="email"
                name='email'
                className='p-4'
                autoComplete='user-name'
                required />
                {error?.fieldErrors?.email && (<p className="text-red-500">{error.fieldErrors.email}</p>)}
                {error?.formErrors && (<p className="text-red-500">{error.formErrors}</p>)}
            </div>
            <div>
                <label htmlFor='password'
                className='mb-2'>Password</label>
                <input 
                defaultValue={fields?.email}
                type="password"
                name='password'
                className='p-4'
                autoComplete='current-password'
                required />
            </div>
            {error?.fieldErrors?.password && (<p className="text-red-500">{error.fieldErrors.password}</p>)}
            {children}
            {error?.fieldErrors && <p className='text-red-600'>{error.formErrors}</p>}
        </Form>
    )
}
export default UserForm