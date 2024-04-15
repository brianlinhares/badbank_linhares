function AllData(){
    const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState([]); 
    const [show, setShow] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setShow(ctx[6].admin);
                function isUser (item) {
                    return item.email === ctx[0].user.email;
                }
                setUser(data.find(isUser));
                
            });

    }, []);

    //displays user information if normal user
    const Cards = () => {
        if (!ctx[2].logIn) {
            return <h1>Please log In</h1>
        } else {
            const card = data.map((user, i) => {
                return (
                    <div key={i} className='card'>
                        <h1 className='card-header'>{user.name}</h1>
                        <ul>
                            <li>User ID: {user._id}</li>
                            <li>Email: {user.email}</li>
                            <li>Password: {user.password}</li>
                            <li>Balance: {user.balance}</li>
                            <li>Role: {user.role}</li>
                        </ul>
                    </div>
                );
            });
            return card;
        }
    }

    //displays all user information cards if admin
    const Card = () => {
        if(!ctx[2].logIn) {
            return <h1>Please Log In</h1>
        } else {
            return(
                <div className='card'>
                    <h1 className='card-header'>{ctx[0].user.name}</h1>
                    <ul>
                        <li>User ID: {ctx[0].user._id}</li>
                        <li>Email: {ctx[0].user.email}</li>
                        <li>Password: {ctx[0].user.password}</li>
                        <li>Balance: {ctx[0].user.balance}</li>
                        <li>Role: {ctx[0].user.role}</li>
                    </ul>
                </div>
            );
        }
    }

    return (<>
        <h5>All Data in Store:</h5>
        {/* {JSON.stringify(data)} */}
        {/* <Cards /> */}
        {show ? 
        <Cards /> :
        <Card />}
    </>);
}