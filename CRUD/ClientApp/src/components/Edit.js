import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {CountryCode} from "./CountryCode";

export const Edit = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);
    const [phoneCode, setPhoneCode] = useState("");

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleSubmit = (event) => {
        const id = window.location.pathname.split('/')[2];
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            
            if (result.isConfirmed) {
                var key = phoneCode.length;
                var phoneNumber = user.phone;
                if(phoneNumber.slice(0, key) === phoneCode) {
                    axios.put(`https://localhost:7141/User/Put/${id}`, user)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                    Swal.fire('Saved!', '', 'success')
                    await timeout(2000);
                    return window.location.href = "/users";
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Is phone number not match with country code',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
        event.preventDefault();

    }

    const handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    }

    useEffect(() => {
        console.log(user.region);
        const id = window.location.pathname.split('/')[2];
        axios.get(`https://localhost:7141/User/GetUserById/${id}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            }, (error) => {
                console.log(error);
            });
    }, []);
    const handlePhoneCode = (event) => {
        setUser({
            ...user,
            region: event.target.value
        });
        setPhoneCode(event.target.value);
    }
    return (
        <div className="container">
            <form className={'w-100'}>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="firstName">Name</label>
                        <input value={user.name} onChange={handleInput} name={'name'} type="text"
                               className="form-control"
                               id="firstName"
                               placeholder="First name" required/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="lastName">Email</label>
                        <input value={user.email} onChange={handleInput} name={'email'} type="email"
                               className="form-control"
                               id="email" placeholder="Last name" required/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="userName">Phone Country</label>
                        <select onChange={handlePhoneCode} className={"form-control"}>
                            {
                                CountryCode.map((item, index) => {
                                    return <option key={index} value={item.Code} selected={user.region === item.code}>{item.Name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="userName">Phone</label>
                        <input value={user.phone} onChange={handleInput} name={'phone'} type="text"
                               className="form-control"
                               id="text" placeholder="Phone" required/>
                    </div>
                </div>
                <button className="btn btn-primary w-100" onClick={handleSubmit}>Edit</button>
            </form>
        </div>
    );
}