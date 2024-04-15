function Home(){
  
  return (
    <Card
      bgcolor="info"  
      txtcolor="black"
      header="BadBank Landing Page"
      title="Welcome to the Best BadBank Website"
      text="You can use this banking app to perform various tasks such as create an account, deposit and withdraw!"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
