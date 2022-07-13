import { RefreshOutlined } from '@mui/icons-material';
import { Badge, CircularProgress, Divider, IconButton, LinearProgress, Tooltip } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import BasicContainer from '../../components/basic/BasicContainer';
import Layout from '../../components/basic/layout';
import { BACKEND_ROOT_URL, defaultBorderColor, FRONTEND_ROOT_URL } from '../../config';
import styled from '@emotion/styled'
import { grey } from '@mui/material/colors';
import SnackbarContext from '../../components/basic/contexts/snackbar_context';
import { validate_user } from '../../components/authenticate_user';

const StyledNotification = styled.div`

    text-align: left;

    &::before{
        content: '';
        position: absolute;
        top:0;
        left:0;
        width: 100px;
        height: 100px;
        background-color: blue;
    }

`
// to (User)
// last_seek_date (Date)
// Created

function parse_date(date){

    // Date (UTC)
    // 2022-06-16T16:02:26.323560Z
    let dt = date.split('T')
    let ymd = dt[0].split('-').map((val) => Number(val))
    let hms = dt[1].slice(0, dt[1].length-1).split(':').map((val) => Number(val));

    console.log("Dis is", [dt, ymd, hms])

    return [...ymd, ...hms]

}



function pretty_print_date(dt){

    return `${dt.getUTCDate()} ${dt.toLocaleString('default', {month: 'long'})}, ${dt.getUTCFullYear()}`


}

function Notifications( { _data, is_authenticated, user_info } ) {

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(_data.notifications);

    const [lastSeenOn, setLastSeenOn] = React.useState(_data.last_seek_on);

    const snackbar = useContext(SnackbarContext);

    const Reload = async () => {

        setLoading(true);

        // Fetch Data

        const response = await fetch(`${FRONTEND_ROOT_URL}api/new_notifications/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        const reload_data = await response.json();

        if (response.status !== 200){

            snackbar.open('error', "Failed to reload new notifications")

        } else {

            setData([ ...reload_data.new_notifications, ...data])
            setLastSeenOn(prev => reload_data.last_seek_on)

        }

        setLoading(false);

    }


  return (
    <Layout title="Notifications - Spade" isAuthenticated={is_authenticated} userInfo={user_info}>
        <BasicContainer>
            <center>
            <div style={{border: '1px solid '+defaultBorderColor, padding: '1.5rem', borderRadius: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div><svg  width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.60124 1.25086C8.60124 1.75459 8.26278 2.17927 7.80087 2.30989C10.1459 2.4647 12 4.41582 12 6.79999V10.25C12 11.0563 12.0329 11.7074 12.7236 12.0528C12.931 12.1565 13.0399 12.3892 12.9866 12.6149C12.9333 12.8406 12.7319 13 12.5 13H8.16144C8.36904 13.1832 8.49997 13.4513 8.49997 13.75C8.49997 14.3023 8.05226 14.75 7.49997 14.75C6.94769 14.75 6.49997 14.3023 6.49997 13.75C6.49997 13.4513 6.63091 13.1832 6.83851 13H2.49999C2.2681 13 2.06664 12.8406 2.01336 12.6149C1.96009 12.3892 2.06897 12.1565 2.27638 12.0528C2.96708 11.7074 2.99999 11.0563 2.99999 10.25V6.79999C2.99999 4.41537 4.85481 2.46396 7.20042 2.3098C6.73867 2.17908 6.40036 1.75448 6.40036 1.25086C6.40036 0.643104 6.89304 0.150421 7.5008 0.150421C8.10855 0.150421 8.60124 0.643104 8.60124 1.25086ZM7.49999 3.29999C5.56699 3.29999 3.99999 4.86699 3.99999 6.79999V10.25L4.00002 10.3009C4.0005 10.7463 4.00121 11.4084 3.69929 12H11.3007C10.9988 11.4084 10.9995 10.7463 11 10.3009L11 10.25V6.79999C11 4.86699 9.43299 3.29999 7.49999 3.29999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> <span style={{fontSize: '20px', fontWeight: '600', marginLeft: '0.5rem'}}>All Notifications</span></div>
                    {loading?
                        <CircularProgress size={25} />:
                        <Tooltip title="Update">
                            <IconButton onClick={Reload}>
                                <RefreshOutlined />
                            </IconButton>
                        </Tooltip>
                    }
                </div>
                <br />

                <Divider style={{width: 'calc(100% + 3rem)', transform: 'translateX(-1.5rem)'}} />
                <br />
                <div style={{maxHeight: '550px', overflowY: 'auto'}}>

                    {/* {data[0].message} */}

                    {
                        // 2022-06-16T16:02:26.323560Z
                        // data.length === 0 ? <h4 style={{color: grey[500]}}>No Notifications to show</h4>:
                        data.map((val, idx) => (
                            <div key={idx}>
                                <div style={{textAlign: 'left', margin: '1rem 0', fontWeight: new Date(...parse_date(val.created_on)) > new Date(...parse_date(lastSeenOn)) ? 'bolder': '300', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{width: '1250px'}}>
                                        <p>{val.message}</p>
                                    </div>
                                    <i style={{fontWeight: '100', fontWeight: new Date(...parse_date(val.created_on)) > new Date(...parse_date(lastSeenOn)) ? 'bolder': '300'}}>{pretty_print_date(new Date(...parse_date(val.created_on)))}&nbsp;&nbsp;</i>
                                </div>
                                <Divider variant="middle" />
                            </div>
                        ))
                    }

                </div>
                
            </div>
            </center>
        </BasicContainer>
    </Layout>
  )
}

export default Notifications

export async function getServerSideProps(context){

    const validation = await validate_user(context);

    const access_token = context.req.cookies?.access || false;

    const response = await fetch(`${BACKEND_ROOT_URL}account/notifications/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });

    const recieved_data = await response.json();


    
    return {
        props: {
            is_authenticated: validation.is_authenticated,
            user_info: validation.user_info,
            _data: recieved_data || []
        }
    }

}