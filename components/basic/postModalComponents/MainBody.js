function MainBody({descr}) {
    return (
        <div dangerouslySetInnerHTML={{__html: descr}}>
            
        </div>
    )
}

export default MainBody
