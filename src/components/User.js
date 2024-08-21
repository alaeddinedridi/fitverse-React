import React from 'react'
import classes from '../styles/User.module.scss'
const User = (props) => {

    const {fullname,email,role}=props.user

    return (
        <tr>
            <td>{fullname}</td>
            <td>{email}</td>
            <td>{role}</td>
            
        </tr>
    )
}

export default User
