import React from 'react';
import '../style/ContactForm.css';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

const Result =() =>{
    return(
      <p>Your message has been successfully sent!</p>
    )
  }

function ContactForm() {

const [result,showResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_p1zyw2e', 'template_wrnavum', e.target, '2VKS5d7eUbOXDTdyQ')
      .then((result) => {
          console.log(result.text);
          showResult(true);
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
      
  };

  return (
    <div className='container'>
      <div className='form_contact'>
        <form onSubmit={sendEmail}>
          <h2>Quick Contact</h2>
          <label>First Name: </label>
          <input type='text' name='fname' placeholder='Enter your firstname' ></input>
          <label>Last Name: </label>
          <input type='text' name='lname' placeholder='Enter your lastname' ></input>
          <label>Mobile: </label>
          <input type='text' name='mobile' placeholder='Enter your mobile number' ></input>
          <label>Subject: </label>
          <input type='text' name='subject' placeholder='Enter message subject' ></input>
          <label>Message: </label>
          <textarea id="msj" name="message" placeholder="Write message.." ></textarea>
          <button type='submit'>Submit</button>
          {result ? <Result /> : null }
        </form>
        </div>
    </div>
  )
}

export default ContactForm