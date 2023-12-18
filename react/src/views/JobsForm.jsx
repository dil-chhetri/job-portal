import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function JobsForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [job, setJob] = useState({
    id: null,
    job_title: '',
    position: '',
    company:'',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/jobs/${id}`)
        .then(({data}) => {
          setLoading(false)
          setJob(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (job.id) {
      axiosClient.put(`/jobs/${job.id}`, job)
        .then(() => {
          setNotification('Job was successfully updated')
          navigate('/jobs')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/jobs', job)
        .then(() => {
          setNotification('Job was successfully created')
          navigate('/jobs')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {job.id && <h1>Update Job: {job.job_title}</h1>}
      {!job.id && <h1>New Job</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={job.job_title} onChange={ev => setJob({...job, job_title: ev.target.value})} placeholder="Job Title"/>
            <input value={job.position} onChange={ev => setJob({...job, position: ev.target.value})} placeholder="Position"/>
            <input value={job.company} onChange={ev => setJob({...job, company: ev.target.value})} placeholder="Company"/>
            <button className="btn btn-success mt-5 p-2">Save</button>
          </form>
        )}
      </div>
    </>
  )
}