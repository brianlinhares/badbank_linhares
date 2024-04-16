function AllData(){
    const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState([]); 
    const [show, setShow] = React.useState(false);


    React.useEffect(() => {       
//================================DATA FROM API================================
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


    return (<>
        <h5>All Data in Store:</h5>
        {JSON.stringify(data)}
    </>);
}

