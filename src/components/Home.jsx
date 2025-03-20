
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const [formData, setFormData] = useState({
        firstName: '',
        mobileNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userData', JSON.stringify(formData));
        navigate('/map');
    };

    return (
        <div className="containers bg-zinc-600 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 ">
            <h1 className="text-2xl text-center font-semibold text-[#f23064] mb-3">Search Form</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required

                    className="inputs"
                />
                <br />
                <label>Mobile Number:</label>
                <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required

                    className="inputs"
                />
                <br />
                <button className="buttons" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Home;
