import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Companies(){
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(()=>{
        getCompanies();
    }, []) 
    
    const onDeleteClick = company => {
        if (!window.confirm("Are you sure you want to delete this company?")) {
          return
        }
        axiosClient.delete(`/companies/${company.id}`)
          .then(() => {
            setNotification('Company was successfully deleted')
            getCompanies()
          })
      }

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
    return (
<div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Companies</h1>
        <Link className="btn-add" to="/companies/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Type</th>
            <th>Created_at</th>
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
            {companies.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.company_name}</td>
                <td>{u.company_type}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/companies/' + u.id}>Edit</Link>
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