import React, { useState, useEffect, useCallback } from 'react'
import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

function AddCompany() {
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({
        id: '',
        name: ''
    });
    const [company, setCompany] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = companyData;
            const response = await fetch("http://localhost:5000/add-company", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            navigate('/company-list');
        } catch (err) {
            alert(err.message);
        }
    };

    const fetchCompanyName = async (value) => {
        setCompanyData({ name: value });
        const data = new FormData();
        data.append("filter", 'company');
        data.append("search", value);
        const response = await fetch(`http://localhost:5000/get-company-name?search=${value}`);
        const d = await response.json();
        setCompany(d.data);
    }

    const handleClick = useCallback(event => {
        let companyId = event.target.id.split('/');
        setCompanyData({
            id: companyId[companyId.length - 1],
            name: event.target.innerText
        });
        setCompany('');
    })

    useEffect(() => {
        let doc = document.querySelectorAll('.show');
        if (doc.length > 0) {
            doc.forEach((value)=>{
                value.addEventListener('click', handleClick);
            })
        }

        return () => {
            if (doc.length > 0) {
                doc.forEach((value)=>{
                    value.addEventListener('click', handleClick);
                })
            }
        }

    }, [company]);

    return (
        <div>
            <button
                className="btn btn-primary ml-5 mt-5"
                onClick={() => navigate('/company-list')}
            >
                Company List
            </button>
            <h1 className="text-center mt-5">Add Company</h1>
            <form className="d-flex justify-content-center mt-5" style={{}} onSubmit={onSubmitForm}>
                <div style={{ position: 'relative', width: '400px', marginRight: '20px' }}>
                    <input
                        type="text"
                        className="form-control"
                        value={companyData.name}
                        onChange={e => fetchCompanyName(e.target.value)}
                    />
                    <div style={{ position: 'absolute', backgroundColor: 'white', width: '100%', padding: company ? '10px' : '0px', boxShadow: '2px 2px 10px #888888' }}>{Parser(company)}</div>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form></div>
    )
}

export default AddCompany;