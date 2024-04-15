function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);

  return (
    <Card
      bgcolor="success"
      header={ctx[2].logIn ? `Withdraw ${ctx[0].user.email}` : 'Please Login'}
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}
//================================SUCCESS MESSAGE================================
function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}
//================================FORM================================
function WithdrawForm(props){
  const ctx = React.useContext(UserContext);
  const [email, setEmail]   = React.useState(ctx[0].user.email);
  const [amount, setAmount] = React.useState('');
//================================SUBMIT================================
  function handle(){
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(<h3>${amount} was withdrawn</h3>);
            props.setShow(false);
            console.log('JSON:', data);
            ctx[5].balanceUser(data.value.balance);
        } catch(err) {
            props.setStatus('Withdraw Transaction Failed');
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
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>
  </>);
}
