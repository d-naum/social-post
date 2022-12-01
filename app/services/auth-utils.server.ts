import SecurePassword from 'secure-password';
const sp= new SecurePassword();
export const hashPassword=async (password:string) => {
    const hashedBuffer= await sp.hash(Buffer.from(password))
    return hashedBuffer.toString('base64')
}
export const verifyPassword=async (hashedPassword:string, password: string)
:Promise<{
    result:'INVALID'|'VALID'
    error?:Error
    improvedHash?:string
}> =>{
    try{
        const result= await sp.verify(
            Buffer.from(password),
            Buffer.from(hashedPassword,'base64')
        )
        switch (result){
            case SecurePassword.VALID:
                return { result: "VALID", error:undefined,improvedHash:undefined }
            case SecurePassword.VALID_NEEDS_REHASH:
                sp.hash(Buffer.from(password),function(err,improvedHash){
                    if(err){
                        console.error(
                            'You are authenticated, But we could not improve your safety'
                        )
                    }
                    return { result: "VALID", error:undefined, improvedHash }
                })
                break
        }
        return{
            result : "INVALID",
            improvedHash:undefined,
            error:new Error('Invalid Password')
        }
    }
    catch(error){
        if(error instanceof Error){
            return{error, result:'INVALID', improvedHash:undefined}
        }
        return { error: new Error('invalid password'),result:'INVALID',improvedHash:undefined}
    }
}