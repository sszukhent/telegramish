import React, { useState, useEffect, Fragment } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import '../Components.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // Sending messages
  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <Fragment>
      <div className='col s8 chat-feed'>
        <ul>
          <li className='col s8 offset-s4 speech-bubble-contact'>
            <h7 className='speech-bubble-name'>
              Kelsey Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 speech-bubble-user'>
            <h7 className='speech-bubble-name'>
              Sean Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 offset-s4 speech-bubble-contact'>
            <h7 className='speech-bubble-name'>
              Kelsey Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 speech-bubble-user'>
            <h7 className='speech-bubble-name'>
              Sean Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 offset-s4 speech-bubble-contact'>
            <h7 className='speech-bubble-name'>
              Kelsey Szukhent
              <span className='speech-bubble-time'>8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 speech-bubble-user'>
            <h7 className='speech-bubble-name'>
              Sean Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 offset-s4 speech-bubble-contact'>
            <h7 className='speech-bubble-name'>
              Kelsey Szukhent
              <span className='speech-bubble-time'>8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 speech-bubble-user'>
            <h7 className='speech-bubble-name'>
              Sean Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 offset-s4 speech-bubble-contact'>
            <h7 className='speech-bubble-name'>
              Kelsey Szukhent
              <span className='speech-bubble-time'>8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
          <li className='col s8 speech-bubble-user'>
            <h7 className='speech-bubble-name'>
              Sean Szukhent
              <span className='speech-bubble-time'> 8:10 pm</span>
            </h7>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              vitae consequuntur nihil itaque voluptatem maiores debitis, omnis
              alias a veritatis iusto sequi numquam saepe inventore velit,
              officiis ab mollitia ut!
            </p>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Chat;
