import { useState, useEffect } from 'react';

function App() {
const [id, setId] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [password, setPassword] = useState('');
const [edit, setEdit] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  getData();
},[]);

const deleteData = async(theData) => {
  const data = JSON.stringify(theData);
  const response = await fetch('http://localhost:8000/delete',
  {
    method: "DELETE",
    headers: {"Content-Type" : "application/json"},
    body: data,
    credentials: 'include'
  });
  const result = await response.json();
  alert(result?.msg);
  getData();
};

const updateData = async(e) => {
  e.preventDefault();
  const dataForm = { id, firstName, lastName };
  const data = JSON.stringify(dataForm);
  const response = await fetch('http://localhost:8000/update',
  {
    method: "PATCH",
    headers:  {"Content-Type": "application/json"},
    body: data,
    credentials: 'include'
  });

  const result = await response.json();
  console.log(result)
  alert(result?.msg)
  getData();
};

const getData = async() => {
  const response = await fetch('http://localhost:8000/get',
  {
    method: "GET"
  });
  const data = await response.json();
  setData(data);
};

const addData = async(e) => {
  e.preventDefault();
  const dataForm = { firstName, lastName, password };
  const data = JSON.stringify(dataForm);
  console.log(data)
  console.log(dataForm)
  const response = await fetch('http://localhost:8000/put', 
  {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body: data,
    credentials: 'include'
  });
  const result = await response.json();
  console.log(result)
  alert(result?.msg)
  getData();
};

  return (
    <div>
      <div>
        <h1>CRUD POSTGRESQL</h1>
      </div>
        {edit ? (
        <>
          <form onSubmit={updateData}>
            <input type="text" value={firstName} placeholder="firsName" required onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" value={lastName} placeholder="lastName" required onChange={(e) => setLastName(e.target.value)}/>
            <button type="submit">update</button>
            <button onClick={() => {setEdit(false); setFirstName(''); setLastName('')}}>cancel</button>
          </form>
        </>
        ):(
          <>
          <form onSubmit={addData}>
            <input type="text" value={firstName} placeholder="firsName" required onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" value={lastName} placeholder="lastName" required onChange={(e) => setLastName(e.target.value)}/>
            <input type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">submit</button>
          </form>
          </>
        )}
      <div>
        <table>
          <thead>
            <tr>
              <th >no</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
              <tr key={data.id}>
                <th>{data.id}</th>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td><button onClick={() => deleteData(data)}>delete</button></td>
                <td><button onClick={() => {
                  setEdit(true)
                  setId(data.id)
                  setFirstName(data.firstName)
                  setLastName(data.lastName)
                  }}>edit</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
