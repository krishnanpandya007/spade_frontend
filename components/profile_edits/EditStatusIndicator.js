import { Button, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useContext } from 'react'
import authContext from '../basic/contexts/layout_auth_context'
import edit_status_indicator from '../profile_edit_apis/edit_status_indicator'
import styles from './rules.module.css'



export const status_indicator_colors = {

  "do not disturb": '#FF1700',
  available: '#65C18C',
  offline: '#DFD3C3',
  away: '#FFBD35',
  busy: '#4C3F91'

}


export default function EditStatusIndicator({styl,username, current_status_indicator, ParentSnackbarMessage, ParentSnackbarSeverity, parentOpenSnackBar}) {

  const [currentIndicator, setCurrentIndicator] = React.useState(current_status_indicator)

  const auth = useContext(authContext)

  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  const handleEditStatusIndicator = async () => {



    // every edit_field have different urls to make change
    // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
    // It must have body[UPDATE req.]

        const response = await edit_status_indicator(username, currentIndicator);


      if (response.status === 200){
        // Successfully Updated Username
        console.log("Updated Username")
        handleRaiseMessageOnSnackbar('success', "Updated your Status Indicator successfully!")
      }else{
        handleRaiseMessageOnSnackbar('error', "Can't able to update status Indicator.")
      }



  }

  return (
    <div style={{ ...styl,width: auth.is_on_mobile ? '100%' : '40%', padding: '0 3%', position: 'relative'}}>

    {!auth.is_on_mobile && <><h3>Current:</h3>
    <ToggleButtonGroup
    // orientation="vertical"
    value={""}
    exclusive
    onChange={(e, newValue) => {}}
    >
              <ToggleButton value="status_indicator" aria-label="list" >
              <div style={{height: '10px', width: '10px', borderRadius: '1000px', backgroundColor: status_indicator_colors[current_status_indicator.toLowerCase()]}}/>
              </ToggleButton>
              <ToggleButton value="status" aria-label="module">
              {current_status_indicator}
                {/* <ViewModuleIcon /> */}
              </ToggleButton>
              
    </ToggleButtonGroup>
    <br />
    <br />
    <br />
    <h3>Change Indicator:</h3></>
            }
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{current_status_indicator}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentIndicator}
          label={current_status_indicator}
          onChange={(e) => {setCurrentIndicator(e.target.value)}}
        >
          { Object.keys(status_indicator_colors).map((val, idx)=>(

          <MenuItem value={val} key={idx}>
            <ToggleButtonGroup
                // orientation="vertical"
                value={""}
                exclusive
                onChange={(e, newValue) => {}}
              >
                <ToggleButton value="status_indicator" aria-label="list" >
                <div style={{height: '10px', width: '10px', borderRadius: '1000px', backgroundColor: status_indicator_colors[val]}}/>
                </ToggleButton>
                <ToggleButton value="status" aria-label="module">
                {val}
                  {/* <ViewModuleIcon /> */}
                </ToggleButton>
                
            </ToggleButtonGroup>
          </MenuItem>
          ))
          }
        </Select>
      </FormControl>
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>Indicator helps to represent your current mood/status</li>
        <li>For ex. it can be offline, Do Not Disturb, Busy etc..</li>
        
    </ul>

    <Button variant="contained" style={{position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius :'100px'}} onClick={handleEditStatusIndicator}>Apply Changes</Button>
</div>
  )
}
