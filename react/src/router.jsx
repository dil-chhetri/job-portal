import {Navigate, createBrowserRouter} from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Users from "./views/Users";
import NotFound from "./views/Notfound";
import UserForm from "./views/UserForm";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Jobs from "./views/Jobs";
import Companies from "./views/Companies";
import CompaniesForm from "./views/CompanyForm";
import JobsForm from "./views/JobsForm";
const router = createBrowserRouter([
    {
        path: '/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/users" /> //we can also render instead of navigating using <Users />
            },
            {
                path: '/users',
                element:<Users />
            },
            {
                path: '/dashboard',
                element:<Dashboard />
            },
            {
                path: '/jobs',
                element:<Jobs />
            },
            {
                path: '/jobs/new',
                element: <JobsForm key="companyCreate" />
            },
            {
                path: '/jobs/:id',
                element: <JobsForm key="companyUpdate" />
            },
            {
                path: '/companies',
                element:<Companies />
            },
            {
                path: '/companies/new',
                element: <CompaniesForm key="companyCreate" />
            },
            {
                path: '/companies/:id',
                element: <CompaniesForm key="companyUpdate" />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            }
        ]
    },
    {
        path: '/',
        element:<GuestLayout/>,
        children:[
            {
                path: '/login',
                element:<Login />
            },
            {
                path: '/signup',
                element:<Signup />
            }
        ]
    },
 

    {
        path: '*',
        element:<NotFound />
    },
])

export default router;