import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Jobs(){
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(()=>{
        getJobs();
    }, []) 
    
    const onDeleteClick = job => {
        if (!window.confirm("Are you sure you want to delete this job?")) {
          return
        }
        axiosClient.delete(`/jobs/${job.id}`)
          .then(() => {
            setNotification('Job was successfully deleted')
            getJobs()
          })
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
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Jobs</h1>
        <Link className="btn-add" to="/jobs/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Position</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {jobs.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.job_title}</td>
                <td>{u.position}</td>
                <td>{u.company}</td>
                <td>
                  <Link className="btn-edit" to={'/jobs/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
 
      
    </div>
    )
}