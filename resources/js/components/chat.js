import { countBy, functions } from 'lodash';
import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router';


const Chat = () => {
    let [params, SetParams] = useState(useParams().id)
    const [items, SetItems] = useState({
        message: '',
        receiver: params
    })
    const [message, SetMessage] = useState([])
    const [friend, SetFriend] = useState([])
    const [loading,SetLoading]=useState(false)
    
    function InputEvent(event) {
        const value = event.target.value
        SetItems((event) => {
            return {
                message: value,
                receiver: params
            }
        });
    }

    function send(e) {

        if (items.message === '') {
            return false;
        }
        SetLoading(true)
        e.preventDefault();

        SetItems(() => {
            return {
                message: '',
                receiver: params
            }
        });

        axios({
            method: "post",
            url: "/send",
            data: JSON.stringify(items),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'applicantion/json',
                'Accept': 'applicantion/json',
                // "X-Socket-Id": Echo.socketId(),
            },
        })
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    };
    useEffect(scrollToBottom, [send]);


    useEffect(() => {
        axios.get('/user/' + params)
            .then((data) => {
                SetFriend(data.data)
            })            
        axios.get('/message/' + params)
            .then((data) => {
                SetMessage(data.data)
            })

        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                SetMessage((oldmessage) => {
                    return [...oldmessage, e.chat]
                })
                SetLoading(false)
            });
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className='offset-lg-3 offset-md-3 col-11 col-md-8 col-sm-11 col-lg-5'>
                        <li className="list-group-item active"><strong>Chat with {friend}</strong></li>
                        <ul className="list-group mt-1">
                            {message.map((data, index) => (
                                <div key={data.id}>
                                    {data.sender == params ? 
                                        <div className='col-lg-6 col-sm-6 col-6'>
                                            <li className="list-group-item bg-white text-right mt-1"><span style={{ fontSize: '15px' }}>{data.message}</span></li>
                                        </div>
                                        :
                                        <div className='col-lg-6 col-sm-6 col-6 ml-auto' >
                                            <li className="list-group-item bg-primary text-white text-right mt-1"><span style={{ fontSize: '15px' }}>{data.message}</span></li>
                                        </div>
                                    }
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </ul>
                        <br />
                        <form>
                            {loading==true?        
                            <span className='float-right'>sending...</span>        
                            :null}
                            <input type="text" className="form-control" name='message' value={items.message} onChange={InputEvent} placeholder="Type Messsage" required />
                            <button className='btn btn-sm btn-primary float-right mt-1' onClick={send}>send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Chat;

