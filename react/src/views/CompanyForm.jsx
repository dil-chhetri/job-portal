import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function CompaniesForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [company, setCompany] = useState({
    id: null,
    company_name: '',
    company_type: '',

  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/companies/${id}`)
        .then(({data}) => {
          setLoading(false)
          setCompany(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (company.id) {
      axiosClient.put(`/companies/${company.id}`, company)
        .then(() => {
          setNotification('Company was successfully updated')
          navigate('/companies')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/companies', company)
        .then(() => {
          setNotification('Company was successfully created')
          navigate('/companies')
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
      {company.id && <h1>Update Company: {company.company_name}</h1>}
      {!company.id && <h1>New Company</h1>}
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
            <input value={company.company_name} onChange={ev => setCompany({...company, company_name: ev.target.value})} placeholder="Company Name"/>
            <input value={company.company_type} onChange={ev => setCompany({...company, company_type: ev.target.value})} placeholder="Company Type"/>
            <button className="btn btn-success mt-5 p-2">Save</button>
          </form>
        )}
      </div>
    </>
  )
}