import React, { useEffect } from 'react'
import {PropTypes} from 'prop-types'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Zoom, CircularProgress, IconButton, Avatar, Popover, ListItemButton } from '@mui/material';
import {NavigateNext} from '@mui/icons-material'


const CONTENT_PER_PAGE = 5;



function PaginatorModal({ title, anchorEl, fetcher, handleClose, open, action_cb }) {

    /*

    fetcher(current_page:int) function must return in format of {error: true|false, end :true|false, data:[{image?:'image://url', primary: 'Helli Oyj', secondary?: 'BOIING'}, ...]}

    */

    const [currPage, setCurrPage] = React.useState(0);
    const [data, setData] = React.useState([]); 
    // Currently there is empty data so currPage=> 0, after initial fetch currPage would be 1
    // const [loading, setLoading] = React.useState(false);
    const [fetchDetails, setFetchDetails] = React.useState({loading: true, error: false, end: false});

    const fetch_new_content = async () => {

        setFetchDetails({...fetchDetails, loading: true});

        const response = await fetcher(currPage + 1);

        if(response.error){

            setFetchDetails({...fetchDetails, error: true});
            return;
        }

        setData(response.data);
        setFetchDetails({...fetchDetails, end: !response.has_next, loading: false});
        setCurrPage(curr => curr + 1);

    }

    useEffect(fetch_new_content, []);

    useEffect(() => {

        const timer = setTimeout(() => {
            setFetchDetails({...fetchDetails, loading: false})
        }, 4000)

        return () => {
            clearTimeout(timer);
        }

    }, [open])

  return (
    <Popover
        open={open}
        anchorEl={anchorEl}
        sx={{borderColor: 'red', p: '5'}}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    >

        <List
            sx={{ width: '100%', maxWidth: 360, minWidth: 220, bgcolor: 'background.paper' }}
            subheader={<ListSubheader sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid', borderBottomColor: 'GrayText'}}><span style={{fontSize: '1.25rem', fontWeight: '700', fontFamily: 'Chivo'}}>{title}</span><IconButton disabled={fetchDetails.loading || fetchDetails.end} onClick={fetch_new_content}><NavigateNext /></IconButton></ListSubheader>}
        >

            {fetchDetails.loading ? <center><CircularProgress size={20} sx={{m: '1rem'}} /></center> :
            <>
            {
                data.map((val, idx) => (

                    <Zoom in key={idx} style={{transitionDelay: `${idx+1}00ms`}}>
                        <ListItem style={{padding: '0'}}>
                            <ListItemButton onClick={() => {action_cb(val.primary)}}>
                                <ListItemIcon>
                                    <Avatar src={val.image} />
                                </ListItemIcon>
                                <ListItemText secondary={val.secondary} primary={val.primary} />
                            </ListItemButton>
                        </ListItem>
                    </Zoom>

                ))
            }
            </>}
        </List>

    </Popover>
  )
}

PaginatorModal.propTypes = {
    title: PropTypes.string,
    anchorEl: PropTypes.object,
    fetcher: PropTypes.function,
    handleClose: PropTypes.function,
    open: PropTypes.boolean
}


export default PaginatorModal