function Balance(){
  const ctx = React.useContext(UserContext);

  return (
    <body>
    <img src="deposit.jpg" className="background"/>
    <div>
      <Card
        bgcolor="info"
        header={ctx[2].logIn ? `Balance for ${ctx[0].user.email}` : 'Please Log In to view your balance'}
        body={
        <BalanceForm />
    }
    />
    </div>
    </body>

  );
}
//================================FORM================================
function BalanceForm(props){
  const ctx = React.useContext(UserContext);
  const [show, setShow]     = React.useState(true);
  const [email, setEmail]   = React.useState(ctx[0].user.email);
  const [balance, setBalance] = React.useState([]);  
 //================================GET ACCOUNT INFO================================
  React.useEffect(() => {
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('JSON:', data);
            setBalance(data.transactions);
            console.log(data);
        } catch(err) {
            console.log('err:', text);
        }
    });
  },[])
//================================TRANSACTION TOGGLE================================
  const display = () => {
    if (show === true) {
      setShow(false);
    } else setShow(true);
  }
  //loops over transactions array and creates an unordered list
  const Transactions = () => {
    if (!ctx[2].logIn) {
      return <p>User Not Logged In</p>
    }
    const History = () => {
      const log = balance.map((item, i) => {
        return <li key={i}>{item}</li>
      });
      return (
        <ul>
          {log}
        </ul>
      );
    }
    return (<> 
    <History />
    </>
    )
  }
  return (<>
    Balance<br/>
    {ctx[2].logIn ? `$ ${ctx[0].user.balance}` : '$0'}<br/><br/>
    Previous Transactions<br/>
    {!show && <Transactions />}
    <button className="btn btn-light" disabled={!ctx[2].logIn} onClick={() => display()}>{show ? 'Transactions' : 'Hide Transactions'}</button><br/>
  </>);
}