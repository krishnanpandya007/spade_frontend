function MainBody({descr}) {
    return (
        <div style={{fontFamily: 'Poppins'}} dangerouslySetInnerHTML={{__html: descr}}>
            
        </div>
    )
}

export default MainBody
