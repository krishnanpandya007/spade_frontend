import React from 'react'

import { Link } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material';
import styles from './About.module.css'

function About() {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          About
        </Link>,

        <Typography key="3" color="text.primary">
          What is Spade
        </Typography>,
      ];


  return (
    <div>
        <Breadcrumbs separator="›" aria-label="breadcrumb" style={{marginLeft: '5%', marginTop: '2%'}}>
            {breadcrumbs}
        </Breadcrumbs>

        <h2 style={{marginLeft: '5%', fontSize: '3rem'}}>About</h2>
        <br />

        {/* [START] What is Spade */}

        <h3 id="what-is-spade" className={styles.topic_heading}>What is <span style={{color: '#4D77FF'}}>Spade</span>?</h3>
            <h4 className={styles.topic_descr}>Ever wonder, the tasks you&apos;re doing on a frequent base , what if there is a shortcut way to do that task in short time Doesn&apos;t it feels good?. Oh Come on, Who doesn&apos;t!!</h4>
            <h4 className={styles.topic_descr}>Not only the shotcut way of doing that task but some tips for doing that task Greatly!!!</h4>
            <h4 className={styles.topic_descr}>That is what SPADE is made for, the people around the world can have similar tasks, challanges to do. On this platform, anyone can share their idea about doing the task more smartly. save time and invest remaining in whatever that feels you good.</h4>
            <h4 className={styles.topic_descr}>Is Spade just for doing tha tasks?, No you can even get some tips, tricks according to whatever you want to. It can be games, coding, studying, cooking, allmost all catagories.</h4>
            <h4 className={styles.topic_descr}>Isn&apos;t that a good idea for taking your lifestyle at new level just by viewing others experiances, advices</h4>
            <h4 className={styles.topic_descr}>And more instrestingly thing, you can also share your experiances, tips and gain the appreciation for that trick or shortcut way, Appreciation helps to improve sense of pride and it kicks your ability to be more smart in further works.</h4>

        {/* [END] What is Spade */}

        <br />
        <br />
        <br />


        {/* [START] How Spade Search works */}

        <h3 className={styles.topic_heading}>How <span style={{color: '#4D77FF'}}>Spade Search</span> works?</h3>
            <h4 className={styles.topic_descr}>Search is a easy way to find the posts, you want .  When you type something on searchbar, so each time when search query changes it gonna re-poppulate the results. </h4>
            <h4 className={styles.topic_descr}>Whatever query you type on the searchbar, the result contains the posts which have most similar title to your query
                and in descending order (most relevant query on top). So be aware! type the keywords simliar to topic you want to see, typing unneccesary words may affect the results.</h4>
            <h4 className={styles.topic_descr}>By clicking one of the results, you got to see the target post and as well as similar posts to the target post, But if you click the <span style={{fontStyle: 'italic', fontWeight: '300'}}>see more</span> option you can see almost all posts which are realated to your search query</h4>

            <h3 className={styles.topic_subheading}>FAQ <span style={{fontWeight: '300', fontSize: '0.8rem'}}>(s)</span></h3>

            {/* FAQ(s) */}
            <details className={styles.faqs}>
                <summary>What if i want to search for author or tags rather than post ?</summary>
                <p>You have to search in format of <span style={{fontWeight: '300'}}> field_name:query </span> <br /> Ex. <span style={{fontStyle: 'oblique', fontWeight: '700'}}> author: krishnan_pandya </span> or <span style={{fontStyle: 'oblique', fontWeight: '700'}}> tags: valorant </span> and Hit-Enter to search!! <br /> Thanks.</p>
            </details>

        {/* [END] How Spade Search works */}

        <br />
        <br />
        <br />


        {/* [START] How Spade Search works */}

        <h3 className={styles.topic_heading}>How post <span style={{color: '#4D77FF'}}>Comment</span> simulates?</h3>
            <h4 className={styles.topic_descr}>Every post have a <span style={{fontStyle: 'italic', fontWeight: '300'}}>Quick Comment </span> option for <span style={{fontStyle: 'italic', fontWeight: '300'}}>type n submit</span> action where you type your quick view and hit Enter key to submit it</h4>
            <h4 className={styles.topic_descr}>Once, you submitted the comment you should see that comment box don&apos;t became empty instantly but after some shot time-duration that is because your comment is submitting to corresponding post and is your comment is added successfully the comment box becames empty which stands for success response</h4>
            <h4 className={styles.topic_descr}>By clicking one of the results, you got to see the target post and as well as similar posts to the target post, But if you click the <span style={{fontStyle: 'italic', fontWeight: '300'}}>see more</span> option you can see almost all posts which are realated to your search query</h4>

            <h3 className={styles.topic_subheading}>FAQ <span style={{fontWeight: '300', fontSize: '0.8rem'}}>(s)</span></h3>

            {/* FAQ(s) */}
            <details className={styles.faqs}>
                <summary>What if i want to write long comment ?</summary>
                <p>Yes, you can. As it&apos;s name hints there is not limit of length of Quick comment as you type in a line</p>
            </details>

        {/* [END] How Spade Search works */}
        

    </div>
  )
}

export default About