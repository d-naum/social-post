import { Link } from "@remix-run/react";
import type { SessionUser } from "~/services/auth.server";
import { Button } from "../Button";

function Nav({user}:{user?:SessionUser}){
    return(
        <nav className="mb-10 flex items-center justify-between">
            <Link to="/">
            <h1 className="text-slate-800">Social App</h1></Link>
            <ul className="flex items-center space-x-2">
                {user &&(
                    <>
                        <li className="flex">
                            <p className="text-slate-500">{user.email}</p>
                        </li>
                        <li className="flex">
                            <form method="post" action="/logout">
                                <Button >Logout</Button>
                            </form>
                        </li>
                    </>
                )}
                {!user &&(
                    <>
                        <li className="flex">
                            <Button as={Link} to='/login'>Login</Button>
                        </li>
                        <li className="flex">
                            <Button as={Link} to='/signup'>Create Account</Button>
                        </li>
                    </>
                )}
               
            </ul>
        </nav>
    )
}
export default Nav;