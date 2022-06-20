import React from 'react'
import Header from '../../components/basic/Header'
import Layout from '../../components/basic/layout'
import CreateTicket from '../../components/CreateTicket'

export async function getServerSideProps(context) {

  console.log(context)

  return {
    props: {
      data: 'Data'
    }
  }

}

function Ticket(props) {
  return (

    <Layout title="Create Ticket - Spade" isAuthenticated={false} >
      {/* <Header /> */}

      <CreateTicket />

    </Layout>
  )
}



export default Ticket