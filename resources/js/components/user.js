import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const user = () => {
    const [user, SetUser] = useState([''])
    useEffect(() => {
        const about = axios.get('/user')
            .then((data) => {
                SetUser(data.data)
            })
    }, [])
    return (
        <>
            <div className="container">
            {user.length==0?
                    <div>
                        <h2 className='text-center'>No Friend Found</h2>
                    </div>
                    :
                <table className="table table-bordered">
                    <thead>
                        <tr>

                            <th>First</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {user.map((data, index) => (
                        <tbody key={index}>
                            <tr >
                                <th>{data.name}</th>
                                <td>
                                    <NavLink className="btn btn-info" to={{
                                        key: data.id,
                                        pathname: '/chat/' + data.id,
                                    }}>Chat</NavLink>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            }
            </div>
        </>
    )
}

export default user
