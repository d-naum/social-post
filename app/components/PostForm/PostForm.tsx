import type{Props} from "./types"

function PostForm({error,fields, method='post',...props}: Props ){
    return(
        
        <form method={method} {...props} className="flex flex-col">
            <div className="mb-4 flex flex-col">
                <label htmlFor="title" className="mb-2">Title</label>
                <input defaultValue={fields?.title} type="text" className="p-4" name="title" placeholder="Title" />
                {error?.fieldErrors?.title && (<p className="text-red-500">{error.fieldErrors.title}</p>)}
                {error?.formErrors && (<p className="text-red-500">{error.formErrors}</p>)}
            </div> 
            <div className="mb-4 flex flex-col">
                <label htmlFor="body" className="mb-2">Body</label>
                <textarea defaultValue={fields?.body} name="body" className="p-4" placeholder="write something amazing" />
                {error?.fieldErrors?.body &&( <p className="text-red-500">{error.fieldErrors.body}</p>)}
                {error?.formErrors && (<p className="text-red-500">{error.formErrors}</p>)}
            </div> 
            <button type="submit" className="transition rounded text-blue-700 bg">Create Post</button>
        </form>
    )
}
export default PostForm