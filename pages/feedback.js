import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/basic/layout'
import submit_feedback_form from "../components/basic/apis/feedback_form_submit"

// import App from "https://framer.com/m/app-jr2U.js@KE6l1htaYLm4Ziuokml6"
// import Card from "https://framer.com/m/Card-abcd.js@abcdef1234"
import { Rating, TextField, Button } from '@mui/material'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { FRONTEND_ROOT_URL } from '../config'

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function Feedback() {

  const [formData, setFormData] = React.useState({
    experience: 3,
    descr: '',
  })

  const handleChange = (event) => {
    
    setFormData({
      ...formData,
      [event.target.name === 'descr' ? event.target.name : 'experience']: event.target.value,
    });
  };

  const submitFeedback = async () => {

    const {experience, descr} = formData;

    const success = await submit_feedback_form(experience, descr);

    if (success) {
      alert('Thanks for your feedback!')

      setFormData({
        experience: 3,
        descr: '',
      })

      window.location.href = FRONTEND_ROOT_URL // Redirect to HomePage
    } else {
      alert('Something went wrong!')
    }

  }

  return (
    // <Layout>
        
  


        <div style={{margin: '5%', paddingLeft: '2%'}}>
          <h1 style={{marginLeft: '-2%'}}>Feedback</h1>

          <p style={{fontFamily: 'Poppins'}}> Feel free to provide honest feedback about your experience to this site, or some suggestions for better improvement on this platform</p>


        {/* <input type="text" placeholder="Type your feedback" /> */}
        <br />
        {/* <select placeholder="Your Experience">
            <option area-label="None" value="Your Experience" >Your Experience</option>
            
            <option  value="bad">Bad (Need Improvement)</option>
            <option value="good">Good</option>
            <option value="amazing">Amazing</option>
          </select> */}
              <label><b>Your Experience</b></label><br/>
              <Rating
              onChange={handleChange}
            name="highlight-selected-only"
            // defaultValue={}
            value={formData.experience}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
          />
        <br />
        <br />

          <TextField value={formData.descr} onChange={handleChange} id="outlined-basic" multiline rows={4} label="Any Suggestions?" variant="outlined" name="descr" />
          <br />
          <br />

        <Button onClick={() => {submitFeedback()}} type="submit" variant="contained" size="large">Submit</Button>
        </div>
    // </Layout>
  )
}

export default Feedback