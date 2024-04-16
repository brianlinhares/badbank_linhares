//main component function
function Home(){
  return (<>

      <div style={{ display: 'flex' }}>
        <form action="#/login/">
          <button name="homelink" type="submit" className="btn btn-primary btn-sm" style={{ margin: '10px 10px 10px 10px' }}>Login</button>
        </form>
        <form action="#/CreateAccount/">
          <button name="homelink" type="submit" className="btn btn-primary btn-sm" style={{ margin: '10px 10px 10px 10px' }}>Sign Up</button>
        </form>
      </div>
      
      <Card
        txtcolor="blue"
        text-shadow= "2px 2px 2px white"
        header="BadBank Capstone"
        title="BadBank: Where Banking Meets Innovation"
        text="Introducing BadBank, the ultimate mobile banking experience!"

        text1="With BadBank, you can easily manage your finances, deposit and withdraw money, check your balance, and even create a new account - all from the convenience of your mobile device. Our app is designed to be user-friendly and secure, so you can trust that your money is in good hands." 
        
        text2="Try BadBank today and experience the future of banking!"
        
        body={(<img src="bankimage2.png" className="img-fluid" alt="Responsive image"/>)}
      />
      
    </>
  );  
}
