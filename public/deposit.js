function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);

  return (<>
    <body>
        <img src="deposit.jpg" className="background"/>
    <div>
      <Card
          bgcolor="warning"
          header={ctx[2].logIn ? `Deposit ${ctx[0].user.email}` : 'Please Login'}
          status={status}
          body={show ? 
            <DepositForm setShow={setShow} setStatus={setStatus}/> :
            <DepositMsg setShow={setShow} setStatus={setStatus}/>}
        />
    </div>
    </body>
        


    
  </>)
}
//================================SUCCESS MESSAGE================================ 
function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 
//================================FORM================================
function DepositForm(props){
  const ctx = React.useContext(UserContext);
  const [email, setEmail]   = React.useState(ctx[0].user.email);
  const [amount, setAmount] = React.useState('');
//================================SUBMIT================================
  function handle(){
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(<h3>${amount} was deposited</h3>);
            props.setShow(false);
            console.log('JSON:', data);
            ctx[5].balanceUser(data.value.balance);
            console.log(data);
        } catch(err) {
            props.setStatus('Deposit Transaction Failed');
            console.log('err:', text);
        }
    });
  }
  return(<>

    Balance<br/>
    {ctx[2].logIn ? `$ ${ctx[0].user.balance}` : '$0.00'}<br/><br/>      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>
  </>);
}