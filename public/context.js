const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

//card component from starter files
function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{maxWidth: "40rm"}}>
      <div  className="card-header">{props.header}</div>
      {/* <div className= "cardFont"> */}
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.text1 && (<p className="card-text">{props.text1}</p>)}
        {props.text2 && (<p className="card-text">{props.text2}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      {/* </div> */}
      </div>
    </div>      
  );    
}
