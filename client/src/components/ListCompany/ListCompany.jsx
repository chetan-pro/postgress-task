import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const [companyList, setCompanyList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const deleteCompanyData = async id => {
    try {
      await fetch(`http://localhost:5000/delete-company/${id}`, {
        method: "DELETE"
      });
      setCompanyList(companyList.filter(data => data.company_id !== id));
      setFilterList(filterList.filter(data => data.company_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const getAllSavedCompanyData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-all-saved-company-data");
      const jsonData = await response.json();
      setCompanyList(jsonData);
      setFilterList(jsonData);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getAllSavedCompanyData();
  }, []);

  function filterByCompanyName(value) {
    setSearchValue(value);
    setFilterList(companyList.filter(data => data.name.includes(value.toUpperCase())));
  }
  return (
    <Fragment>
      <button
        className="btn btn-primary ml-5 mt-5"
        onClick={() => navigate('/add-company')}
      >
        Add Company
      </button>
      <h1 className="text-center">Added Company List</h1>
      <div style={{ width: '30%', margin: 'auto', marginTop: '20px' }}>

        <input
          type="text"
          className="form-control"
          value={searchValue}
          placeholder='Search By Company Name'
          onChange={e => filterByCompanyName(e.target.value)}
        />
      </div>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th style={{width:'20%'}}>S no.</th>
            <th style={{width:'30%'}}>CIN</th>
            <th style={{width:'30%'}}>Name</th>
            <th style={{width:'20%'}}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterList.map((companyData, index) => (
            <tr key={companyData.cin}>
              <td>{index + 1}</td>
              <td>{companyData.cin}</td>
              <td>
                {companyData.name}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCompanyData(companyData.company_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CompanyList;
