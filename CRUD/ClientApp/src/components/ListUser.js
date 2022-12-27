import {useState} from "react";

import {useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
export const ListUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://localhost:7141/User/Get',
            );
            console.log(result.data);
            setUsers(result.data);
        };
        fetchData();
    }, []);
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(`https://localhost:7141/User/Delete/${id}`)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                await timeout(2000);
                return window.location.href = "/users";
            }
        })
    }

    return (
        <>
            <h1 id="tabelLabel" >Users</h1>
            <div className={"d-flex justify-content-between"}>
                <p>This component demonstrates fetching data from the server.</p>
                <Link to={'/create'} className={"btn btn-secondary"}>Add User</Link>
            </div>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>+ {user.phone}</td>
                        <td className={"d-flex gap-2"}>
                            <Link to={`/edit/${user.id}`} className={"btn btn-warning"} >Edit</Link>
                            <button className={"btn btn-danger"} onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
