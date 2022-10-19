import React from 'react'
import Header from '../../components/basic/Header'
import Layout from '../../components/basic/layout'
import CreateTicket from '../../components/CreateTicket'


function Ticket(props) {
  return (

    <Layout title="Create Ticket - Spade" isAuthenticated={props.is_authenticated} userInfo={props.user_info}>
      {/* <Header /> */}

      <CreateTicket />

    </Layout>
  )
}

export async function getServerSideProps(context) {

    
    
  const response = await validate_user(context);
  

  return {
      props: {is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null}
  }


}

export default Ticket