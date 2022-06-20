import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  // Stack,
} from "@mui/material";

import {
  Add,
  ArrowDropDown,
  MinimizeOutlined,
  Remove,
} from "@mui/icons-material";
import * as React from "react";
import PropTypes from "prop-types";

import styles from './CreatePostWidgetMenu.module.css';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { Grid } from '@material-ui/core';
// const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

// const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

function CreatePostWidgetMenu({ chip_data, top_tags, ChangeChipData }) {
  const [open, setOpen] = React.useState(false);
  const [topTags, setTopTags] = React.useState(
    top_tags.map((val) => {
      return { tag_name: val, action: "+" };
    })
  );
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  React.useEffect(() => {
    setTopTags(
      topTags.map((val) => {
        return {
          tag_name: val.tag_name,
          action: chip_data
            .map((vali) => {
              return vali.label;
            })
            .includes(val.tag_name)
            ? "-"
            : "+",
        };
      })
    );
  }, [chip_data]);

  // const handleClick = () => {
  //   console.info(`You clicked ${"me"}`);
  // };

  const handleMenuItemClick = (event, tagName, index) => {
    let copy_topTags = topTags.map((val) => {
      return val;
    });
    // alert(tagName)
    for (let i = 0; i < copy_topTags.length; i++) {
      if (copy_topTags[i].tag_name === tagName) {
        copy_topTags[i].action = copy_topTags[i].action === "+" ? "-" : "+";
        if (copy_topTags[i].action === "+") {
          let new_chipData = chip_data.map((val) => {
            return val;
          }); // Copy without refrencing
          let decreaser = 0;
          let targetIndex = -1;
          for (let j = 0; j < chip_data.length; j++) {
            if (chip_data[j].label === topTags[i].tag_name) {
              decreaser = 1;
              targetIndex = j;
              continue;
            }
            new_chipData[j].key -= decreaser;
          }
          if (targetIndex >= 0) {
            // alert("Removing hahahaha....")
            ChangeChipData([
              ...new_chipData.slice(0, targetIndex),
              ...new_chipData.slice(targetIndex + 1, new_chipData.length),
            ]);
          }
        } else if (copy_topTags[i].action === "-") {
          ChangeChipData([
            ...chip_data,
            { label: topTags[i].tag_name, key: chip_data.length },
          ]);
        }
      }
    }
    setTopTags(copy_topTags);
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
    <Grid item container style={{ width: "100%"}}>
      <React.Fragment >
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={handleMenuItemClick} style={{color: '#F5F5F5', backgroundColor: '#516BEB'}}>Top Tags</Button>
          <Button
            style={{color: '#F5F5F5', backgroundColor: '#516BEB'}}
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDown />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {topTags.map((option, index) => (
                      <MenuItem
                        key={index}
                        sx={{ width: "100%!important" }}
                        selected={index === selectedIndex}
                        onClick={(event) =>
                          handleMenuItemClick(event, option.tag_name, index)
                        }
                      >
                        {/* <Stack direction="row" spacing={2}> */}
                        <Button
                          variant="outlined"
                          endIcon={option.action === "+" ? <Add /> : <Remove />}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: '#516BEB',
                            // borderColor: '#516BEB',
                            
                          }}
                          // color='#516BEB'
                        >
                          {option.tag_name}
                        </Button>
                        {/* </Stack> */}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
      
    </Grid>
    <br />
    <br />
    <div className="tips-main">
      <h2 style={{color: '#8267BE', fontFamily: 'sans-serif'}}>Tips to improve Your Post</h2>
      <ul className={styles.tips_list_main}>
        <li>Make your topic &apos; Title &apos; more reliable and short </li>
        <li>Make your content to the point as much possible</li>
        <li>Add tags (which helps to identify your content and make reachable to relevant users)</li>
        <li>(optional) For better understanding add images, if needed!</li>
      </ul>
    </div>
    </div>

  );
}

export default CreatePostWidgetMenu;

CreatePostWidgetMenu.propTypes = {
  top_tags: PropTypes.array,
};

CreatePostWidgetMenu.defaultProps = {
  top_tags: [
    "call-of-duty",
    "top-trick",
    "how-to-rush",
    "peek-like-pro",
    "kill-campers",
  ],
};
