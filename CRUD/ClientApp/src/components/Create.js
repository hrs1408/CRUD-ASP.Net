import {useState} from "react";
import axios from "axios";
import {CountryCode} from "./CountryCode";
import Swal from 'sweetalert2';

export const Create = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        region: '',
        phone: ''
    });

    const [phoneCode, setPhoneCode] = useState("");
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var key = phoneCode.length;
        var phoneNumber = user.phone;
        if(phoneNumber.slice(0, key) === phoneCode){
            axios({
                method: 'post',
                url: `https://localhost:7141/User/Post`,
                data: user,
                headers: {'Content-Type': 'application/json'}
            }).then(async () => {
                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )
                await timeout(3000);
                return window.location.href = "/users";
            }, (error) => {
                console.log(error);
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Is phone number not match with country code',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
       
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

    const handlePhoneCode = (event) => {
        setUser({
            ...user,
            region: event.target.value
        });
        setPhoneCode(event.target.value);
    }

    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={handleSubmit} className={"w-100"}>
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
                                    return <option key={index} value={item.Code}>{item.Name}</option>
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
                    {
                        <> Your Phone Code: {phoneCode}</>
                    }
                </div>
                <button className="btn btn-primary mx-auto w-100" type="submit">Create</button>
            </form>
        </div>
    );
}
        
        