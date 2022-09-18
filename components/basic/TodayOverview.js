import React from 'react'
import styled from '@emotion/styled'
import { Fab } from '@mui/material';
import { Navigation } from '@mui/icons-material';
// import TodayOverviewMain from '../today_overview_main';
import dynamic from 'next/dynamic';

const TodayOverviewToggleButton = styled.button`

    position: fixed;
    bottom: 2rem;
    right: 1rem;
    background-color: #516BEB;
    border: none;
    outline: 0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.25);
    padding: 1rem 1.6rem;
    font-family: Roboto;
    font-size: 0.9rem;
    border-radius: 10px;
    font-weight: 600;
    color: white;

`

const TodayOverviewMain = dynamic(() => import('../today_overview_main'), {
    loading: () => <TodayOverviewToggleButton style={{color: 'white', backgroundColor: '#c4c4c4'}}>Get Ready...</TodayOverviewToggleButton>
})

function TodayOverview() {

    const [opened, setOpened] = React.useState(false);

  return (
        !opened ? <TodayOverviewToggleButton onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={() => {setOpened(true)}}>How&apos;s Today?</TodayOverviewToggleButton> : <TodayOverviewMain opened={opened} closeModal={() => {setOpened(false)}} />
    )
}

export default TodayOverview