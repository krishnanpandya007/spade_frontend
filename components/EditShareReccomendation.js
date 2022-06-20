import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Button, Modal, Snackbar, Switch, Tab, Tabs, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors';
import { Box, styled } from '@mui/system';
import React from 'react'
import edit_recommendations from './profile_edit_apis/edit_recommendations';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const StyledBox = styled(Box)`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: max(650px, 80%);
    width: max(380px, 70%);
    background-color: white;
    border: 2px solid #000';
    box-shadow: 24;
    padding: 0.3rem 1rem;

`

function EditShareReccomendation({isOpen, _onClose, target_username, switch_status}) {


    const [currentIndex,setCurrentIndex] = React.useState(0)
    // const [open, setOpen] = React.useState(true)

    const [inBehalfRecSwitch, setInBehalfRecSwitch] = React.useState(switch_status ?? false)
    const [targetUsername, setTargetUsername] = React.useState(target_username ?? '')
    const [loading, setLoading] = React.useState(false)

    const handleChangeRecommendations = async () => {

      setLoading(true);
      
      const response = await edit_recommendations(inBehalfRecSwitch, targetUsername);

      setLoading(false)

      if (response.status === 200) {
        alert("Recommendations Updated!")
        _onClose()
      }else if(response.status === 401) {
        // User doesnt open to on_behalf-recommendation
        alert("You can't turn off your Recommendations before 15 days from when you turn it on!")
      }
      else if(response.status === 400) {
        // User doesnt open to on_behalf-recommendation
        alert("The username you entered is not open to On-Behalf recommendation!")
      }
      else {
        alert("Something went wrong!")
      }


    }

  return (
    <div>
        <Modal
            open={isOpen}
            onClose={_onClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
        >
        
            <StyledBox>
                <Tabs value={currentIndex} onChange={(e, newVal) => {setCurrentIndex(newVal)}}>
                    <Tab label="In-Behalf Reccomendation" />
                    <Tab label="Change Reccomendation" />
                    
                </Tabs>
                <TabPanel value={currentIndex} index={0} >
                        In-Behalf recommendation allows you to get recommendations of posts as another user!
                        <br />
                        <br />

                        This is done under certain privacy and policy that you must have been informed
                        <br/>
                        <br/>
                        <br/>

                        <b>Rules: </b>
                        <ul>
                            <li>That account has to be open to In-Behalf recommendations, as well as yours too</li>
                        </ul>
                        <Alert severity="warning">
                          {/* <AlertTitle>NOTE:</AlertTitle> */}
                          Recommendation doesn&apos;t represent person&apos;s character. Its just the system&apos;s predictions for any user or account
                        </Alert>
                        <br/>
                        <br/>

                        <Button onClick={() => {setCurrentIndex(1)}} disableElevation variant="contained" style={{backgroundColor: blue[500]}} endIcon={<ArrowForwardIosOutlined />}>Next</Button>

                </TabPanel>
                <TabPanel value={currentIndex} index={1} >
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum consequatur repellat explicabo, dolorem eaque amet quos at itaque veritatis nesciunt quis ratione ipsam, accusamus sunt. Placeat ullam quisquam numquam exercitationem adipisci blanditiis optio error, atque molestias asperiores qui ea aspernatur!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit iure corporis fugit deserunt alias quis consectetur praesentium, rem et accusantium?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat repudiandae eos, eveniet qui pariatur possimus voluptas minima minus mollitia laboriosam tempore animi velit quod? Aliquam, blanditiis dolorem recusandae inventore consectetur in eius eos necessitatibus distinctio. Cupiditate tempore, expedita officiis atque assumenda earum ex veritatis aut, aspernatur dolorum rem voluptate quis. */}
                        <Alert severity="warning" >
                          <AlertTitle>NOTE :</AlertTitle>
                          You can only change this action after 15 days
                        </Alert>
                        <br />

                        <Switch defaultChecked={inBehalfRecSwitch} onChange={(e, newVal) => {setInBehalfRecSwitch(currentStatus => !currentStatus)}} />In-Behalf recommendations 
                        <br />

                        <br />
                        <br />
                        <b>Provide the account username which you want to see recommendations as.</b>
                        <br />
                        <br />

                        <div style={{display: 'flex', alignItems: 'center'}}>

                        <TextField disabled={!inBehalfRecSwitch} variant="filled" label="Username" value={targetUsername} onChange={(e) => {setTargetUsername(e.target.value)}} />
                        {/* <IconButton>
                          <Search />
                        </IconButton> */}
                        {/* <Button disabled={!inBehalfRecSwitch} sx={{ml: 3}} size="small">Set In-Behalf user</Button> */}
                        </div>
                        <br />
                        <br />
                        <br />



                        <LoadingButton loading={loading} style={{backgroundColor: blue[500]}} variant="contained" disableElevation onClick={handleChangeRecommendations}>apply changes</LoadingButton>
                        {/* <ToggleButton /> */}
                </TabPanel>
            </StyledBox>

        </Modal>
    </div>
  )
}

export default EditShareReccomendation