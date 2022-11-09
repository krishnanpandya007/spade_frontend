
function Error({ statusCode }) {
    return (
        <center style={{marginTop: '40vh', transform: 'translateY(-50%)'}}>
            <div>
                <h1 style={{ fontFamily: 'Chivo', opacity: '0.15', fontSize: 'max(4rem, 15vw)', marginBlock: '0'}}>{statusCode}</h1>
            </div>
                <h3><span style={{fontWeight: 'lighter', fontSize: '1rem'}}>{statusCode === 404 ? "Page Not Found" : "Something wrong, our side"}</span> | Resume Your Journey <a href="/" style={{color: '#4D77FF', textDecoration: 'underline'}}>Here.</a></h3>
        </center>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
  }
  
  export default Error