import type{ Props } from "./types"
import cx from 'classnames';


function Button({as='button', children, className,...props}:Props){
    const Component= as
    return(
        <Component className={cx("transition rounded text-blue-700 bg-blue-200 font-bold py-4 px-5 transparent hover:bg-gray-100")} {...props}>{children}</Component>
    )
}
export default Button