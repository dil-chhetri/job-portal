import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout(){
    const {user, token, setUser, setToken, notification} = useStateContext()
    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (e) =>{
        e.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/companies">Companies</Link>


            </aside>
            <div className="content">
                <header>
                    <div>
                        <h4><a href="" className="text-decoration-none text-dark fw-bold shadow">Jobber</a></h4>
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="mx-2 btn-logout btn btn-danger">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification &&
            <div className="notification">
                {notification}
            </div>
            }   
        </div>
    )
}