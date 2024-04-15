//create account function
function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

//success message after account is created
function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button><br/><br/>
    <form action="#/login/">
        <input className="btn btn-light" type="submit" value="Login" />
    </form>
  </>);
}

//function to create form
function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState(null);

  //radio buttons for selecting roles
  function radioSelect(e) {
    if (e.target.value == null) {
      setRole("normal");
    } else {
      setRole(e.target.value);
    }
  }

  //handles submit for form
  function handle(){
    if (role == null) {
      props.setStatus('Please select a role');
      setTimeout(() => {
      props.setStatus('');
      }, 3000);
      return;
    }
    console.log(name,email,password,role);
    const encodePassword = encodeURIComponent(password);
    const url = `/account/create/${name}/${email}/${encodePassword}/${role}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    props.setShow(false);
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

      <fieldset>
        <legend>Select role:</legend>

        <div>
          <input type="radio" id="normal" name="userType" value="normal" onChange={radioSelect}/>
          <label htmlFor="normal">Normal User</label>
        </div>

        <div>
          <input type="radio" id="admin" name="userType" value="admin" onChange={radioSelect}/>
          <label htmlFor="admin">Admin</label>
        </div>
      </fieldset>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}