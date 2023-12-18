import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


export default function Dashboard(){
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getCompanies();
        getJobs();
    }, [])

    const getCompanies = () =>{
        setLoading(true)
        axiosClient.get('/companies')
        .then(({data})=>{
            setLoading(false)
            setCompanies(data.data)
            console.log(data)
        })
        .catch(
            setLoading(false)
        )
    }

    const getJobs = () =>{
        setLoading(true)
        axiosClient.get('/jobs')
        .then(({data})=>{
            setLoading(false)
            setJobs(data.data)
            console.log(data)
        })
        .catch(
            setLoading(false)
        )
    }
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-4 card mx-5 shadow"><h4>Users</h4></div>
                <div className="col-md-4 card mx-5 shadow"><h4>Jobs</h4></div>
                <div className="col-md-4 card mx-5 shadow"><h4>Companies</h4></div>
                <div className="col-md-4 card mx-5 shadow"><h4>Categories</h4></div>
                <div className="col-md-10 card shadow mt-5 justify-content-center ">
                    <h4>Jobs</h4>
                    {loading && 
                            <div className=" d-flex flex-wrap justify-content-center"></div>
                        }
                        {!loading && 
                        <div className=" d-flex flex-wrap justify-content-center">
                        {jobs.map(u =>(
                            <div key={u.id} className="w-25 card shadow mx-2">{u.job_title}</div>
                        ))}
                         </div>
                        }
                </div>
            <div className="row  justify-content-around">
                <div className="col-md-5 card shadow mt-5 justify-content-center ">
                    <h4>Top Companies</h4>
                    
                        {loading && 
                            <div className=" d-flex flex-wrap justify-content-center"></div>
                        }
                        {!loading && 
                        <div className=" d-flex flex-wrap justify-content-center">
                        {companies.map(u =>(
                            <div key={u.id} className="w-25 card shadow mx-2">{u.company_name}</div>
                        ))}
                         </div>
                        }




                    </div>
               

                <div className="col-md-5 card shadow mt-5 justify-content-center ">
                    <h4>Top Companies</h4>
                    {loading && 
                        <div className=" d-flex flex-wrap justify-content-center"></div>
                    }
                    {!loading && 
                    <div className=" d-flex flex-wrap justify-content-center">
                    {companies.map(u =>(
                        <div key={u.id} className="w-25 card shadow mx-2">{u.company_name}</div>
                    ))}
                    </div>
                    }
                </div>

                </div>

                
            </div>
        </div>
    )
}