import { Avatar, CircularProgress, Divider, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import styles from './TicketDetailedView.module.css'

import { useRouter } from 'next/router'
import { create_answer } from './search_query_api/create_answer';
import { render } from 'react-dom';
import { BACKEND_ROOT_URL } from '../../config';
import { verify_answer } from './search_query_api/verify_answer';
import handle_ticket_like from './search_query_api/handle_ticket_like';

function TicketDetailedView({ data, userIsAuthor, isAuthenticated, userProfilePic, username}) {

    const [dataCopy, setDataCopy] = React.useState(data)

    const [newAnswerValue, setNewAnswerValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {

        console.log(dataCopy)

    }, [dataCopy])

    const handleLike = async () => {

        console.log(dataCopy.id)
        if(dataCopy.likes.includes(username)) {

            // Remove Like (UnLike)
            // 1. Api call
            // If success => changeState (likes.remove(username))
            const success = await handle_ticket_like(dataCopy.id, 'unlike');

            if(success){

                setDataCopy({...dataCopy, likes: dataCopy.likes.filter((val) => val !== username)})

            }

        } else {

            // Add Like
            const success = await handle_ticket_like(dataCopy.id, 'like');

            if(success){

                setDataCopy({...dataCopy, likes: [...dataCopy.likes, username]})

            }

        }

    }

    const verifyAnswer = async (answer) => {
    
        // setDataCopy({verified_answer: false, answers: []})
        // return;
        let finalDecision = confirm(`Are you sure you want to verify this answer?\n Does this answer your question?`);

        if(!finalDecision){
            return;
        }

        const success = await verify_answer(data.id, answer.id);


        if (success){

            setDataCopy({...dataCopy, verified_answer: answer, answers: dataCopy.answers.filter((childanswer) => childanswer !== answer)})
            return;

        }


        // if(success){



        // }


    } 
    const router = useRouter();

    const createNewAnswer = async () => {

        if (newAnswerValue.length < 5) {

            alert("Answer need to be at least 5 characters long");

        }

        if (!isAuthenticated) {


            router.push('/login');

        }

        setLoading(true);

        const data = await create_answer(newAnswerValue, dataCopy.id); //-__-// -> new_id
        console.log(data)

        if (data.success) {

            setDataCopy({...dataCopy, answers: [...dataCopy.answers, {id: data.data.new_answer_id, descr: newAnswerValue, author_username: username, author:{profile_pic: userProfilePic} }]})

            setNewAnswerValue('')
        }

        setLoading(false);

    }  


  return (
        // <>
        //     {data.verified_answer ? 1 : 0}
        //     {data.answers.length}
        //     <button onClick={() => {data.verified_answer = !(data.verified_answer);setDataCopy(dataCopy ? 1 : 0)}}>Yes</button>
        //     <button onClick={() => {alert(data.verified_answer ? 1 : 0)}}>Show Verified Answer</button>
        // </>
    <div style={{margin: '3rem'}}>



        <div className={ styles.user_info_container }>
            <Avatar src={BACKEND_ROOT_URL.slice(0, BACKEND_ROOT_URL.length-1)+dataCopy?.author?.profile_pic} style={{marginRight: '2rem'}} />
            <Typography variant="h6" style={{margin: '0', padding: '0'}}>
                {dataCopy.author_username}
            </Typography>
        </div>

        {/* Below Conteiner represents Status of answer and title of Ticket */}
        <div className={ styles.status_title_container }>
            <div style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center', marginRight: '2rem'}}>
                {
                    dataCopy?.verified_answer ? 
                <Tooltip title={"Closed"}>
                    <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="red" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Tooltip>:null
                }
            </div>
            <h2  style={{margin: '0'}} className={ styles.ticket_title }>
                {dataCopy?.title}
            </h2>
        </div>

        <p className={styles.ticket_descr}>
            {dataCopy?.descr}
        </p>
        <br />
        <div className={ styles.ticket_indication }>
        
        <svg className={styles.likeIcon} onClick={handleLike} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1C7.66148 1 7.81301 1.07798 7.90687 1.20938L12.9069 8.20938C13.0157 8.36179 13.0303 8.56226 12.9446 8.72879C12.8589 8.89533 12.6873 9 12.5 9H10V11.5C10 11.7761 9.77614 12 9.5 12H5.5C5.22386 12 5 11.7761 5 11.5V9H2.5C2.31271 9 2.14112 8.89533 2.05542 8.72879C1.96972 8.56226 1.98427 8.36179 2.09314 8.20938L7.09314 1.20938C7.18699 1.07798 7.33853 1 7.5 1ZM3.4716 8H5.5C5.77614 8 6 8.22386 6 8.5V11H9V8.5C9 8.22386 9.22386 8 9.5 8H11.5284L7.5 2.36023L3.4716 8Z" fill={dataCopy.likes.includes(username) ? "#2D31FA" : "grey"} fillRule="evenodd" clipRule="evenodd"></path></svg>
        <strong  style={{marginLeft: '0.5rem'}}>{dataCopy.likes.length}</strong>

        <Tooltip title={"Catagory"}>

            <div style={{display: 'flex', marginLeft: '4%',padding: '0.2rem 0.5rem',alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '5px', backgroundColor: '#C4C4C4'}}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V4H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H4V10H1.5C1.22386 10 1 10.2239 1 10.5C1 10.7761 1.22386 11 1.5 11H4V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V11H10V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H11V5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H11V1.5ZM10 10V5H5V10H10Z" fill="#5B5B5B" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <p style={{margin: '0 0.4rem', fontFamily: 'Poppins'}}>{ dataCopy?.catagory }</p>
            </div>
        </Tooltip>
        </div>
        <br />
        <br />
        <Divider variant="middle" />
        <br />
        <br />

        {
            dataCopy.answers.length > 0 || dataCopy.verified_answer ?
            <><h1 style={{fontFamily: 'Changa'}}>Answers: </h1><br /><br /></>:null
        }

        {
            dataCopy?.verified_answer ?

                <div className={styles.answer_container}>
                            
                    <div className={ styles.user_info_container }>
                        <Avatar src={BACKEND_ROOT_URL.slice(0, BACKEND_ROOT_URL.length-1)+dataCopy.verified_answer.author?.profile_pic} style={{marginRight: '2rem'}} />
                        
                        <Typography variant="h6" style={{margin: '0', padding: '0'}}>
                            {dataCopy.verified_answer.author_username}
                        </Typography>
                    </div>
                    
                    <div className={ styles.status_title_container }>

                        <div style={{width: '40px', height: '40px', display: 'grid', placeItems: 'center', marginRight: '2rem'}}>
                            {
                                dataCopy?.verified_answer ? 
                            <Tooltip title={"Verified Answer"}>
                                <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="#00C897" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </Tooltip>:null
                            }
                        </div>
                        <p>
                            {dataCopy.verified_answer.descr}
                        </p>

                    </div>

                    <br />
                    <br />

                </div> : null
        }



        {
            dataCopy?.answers.length > 0 ?

       

            dataCopy?.answers.map((answer, index) => {

                return (
                    <div key={index} className={styles.answer_container}>
                       
                       <div className={ styles.user_info_container }>
                            <Avatar src={BACKEND_ROOT_URL.slice(0, BACKEND_ROOT_URL.length-1)+answer?.author?.profile_pic} style={{marginRight: '2rem'}} />
                            <Typography variant="h6" style={{margin: '0', padding: '0'}}>
                                {answer.author_username}
                            </Typography>
                        </div>

                        <div className={ styles.status_title_container }>

                            <div style={{width: '40px', height: '40px', display: 'grid', placeItems: 'center', marginRight: '2rem'}}>
                                {
                                    // Make it useIsAuthor instead of !userIsAuthor
                                    !dataCopy.verified_answer && userIsAuthor ? 
                                <Tooltip title={"Mark As verified"}>
                                    <svg onClick={() => {verifyAnswer(answer)}} className={ styles.verify_undone } width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                </Tooltip>:null
                                }
                            </div>
                            <p>
                                {answer.descr}
                            </p>

                        </div>
                        <br />
                        <br />

                    </div>
                )

            }) : <>{dataCopy?.verified_answer ?null: <h1 style={{fontFamily: 'Changa', fontWeight: '500'}}>No Answers yet, Have One?</h1>}</>

        }

        {
            dataCopy?.verified_answer ? null : <>
            <br />
                <textarea placeholder="Describe Your Answer..." value={newAnswerValue} onChange={(e) => {setNewAnswerValue(e.target.value)}} cols="110" rows="15" style={{ fontSize: '1rem',padding: '1rem',border: '2px solid #c4c4c4', borderRadius: '10px', outline: 'none', background: '#c4c4c450'}}></textarea>
                <br />
                <br />
                {

                    loading?
                    <><CircularProgress style={{color: '#6BCB77', width: '30px', height: '30px'}} thickness={5} /></>:
                    <button className={ styles.submit_answer_button } onClick={createNewAnswer} > Submit Answer</button>

                }
            </>
        }


    </div>
  )
}

export default TicketDetailedView