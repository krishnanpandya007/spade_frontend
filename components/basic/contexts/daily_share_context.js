import { createContext } from "react";

const DailyShareContext = createContext({text_content_loaded:false, error:false, audio_content_loaded: false, audio_content: [], text_content: [], current_audio_id: null, current_audio_page: { page_no: 0, isLoaded: false, isFinished: false }, current_text_page: { page_no: 0, isLoaded: false, isFinished: false }, finish_mode: (mode) => {}, set_page: (type, page_no, is_loaded) => {},set_current_audio: (audio_id) => {}, loaded: (mode) => {}, display_error: (error_message) => {}, like: (target_ds_id) => {}, unlike: (target_ds_id) => {}, set_content: (type, content) => {}})
// content: { id: 3, title: 'Make the world Mine', audioURL: 'https://www.google.com', likes: 3, isLiked: false, author_name: 'krishnan_pandya', author_pic: 'https://www.google.com' }

export default DailyShareContext;