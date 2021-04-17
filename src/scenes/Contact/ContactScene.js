import React, {useState} from 'react';

export function ContactScene() {

    const [formData, setFormData] = useState({name: "", email: "", subject: "", message: ""});

    const { name, email, subject, message } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
    }

  return (
   <div className="content">

        <h2>Laissez-nous un message !</h2>

       <div className="content__form">
           <form onSubmit={handleSubmit} className="form-wrapper">

               <div className="form-wrapper__bloc">
                   <label htmlFor="nameInput" className="form-label">Votre nom</label>
                   <input type="text" className="form-control" id="nameInput" name="name"
                          value={name} onChange={handleChange} required />
               </div>

               <div className="form-wrapper__bloc">
                   <label htmlFor="emailInput" className="form-label">Votre email</label>
                   <input type="email" className="form-control" id="emailInput" name="email"
                          value={email} onChange={handleChange} required />
               </div>

               <div className="form-wrapper__bloc">
                   <label htmlFor="subjectInput" className="form-label">Votre sujet</label>
                   <input type="text" className="form-control" id="subjectInput" name="subject"
                          value={subject} onChange={handleChange} required />
               </div>

               <div className="form-wrapper__bloc">
                   <label htmlFor="messageInput">Votre message</label>
                   <textarea className="form-control" id="messageInput" rows="3" onChange={handleChange} required>
                       {message}
                   </textarea>
               </div>

               <button type="submit" className="btn btn-motoo-outline">Envoyer</button>

           </form>

       </div>

   </div>
  );
}
