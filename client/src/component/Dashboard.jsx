import React from 'react'

const Dashboard = (props) => {
    const handleLogout =()=>{
        props.history.push("./component/auth/Login")
    }
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <input type="button" onClick={handleLogout}value="Logout"/>
        </div>
    )
}

export default Dashboard