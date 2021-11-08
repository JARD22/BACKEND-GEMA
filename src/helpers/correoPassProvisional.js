const nodemailer = require('nodemailer');


const passProvisional = async(pass,correo)=>{
    try {
      
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
          },
        });

      let info = await transporter.sendMail({
        from: `"GEMA" <${process.env.EMAIL}>`, // sender address
        to: `${correo}`, // list of receivers
        subject: "Contraseña Provisional", // Subject line
        html: 
        `<html>
        <head>
               
        </head>
        <body>
        
        <div class="container">
          <div class="card">
            
              <h2>Bienvenido</h2>
              <h4>GEMA</h4>
              <h4>Tu registro de usuario ha sido exitoso</h4>
              <h4>Tus credenciales para acceder son las siguientes</h4>
              
           
            <div class="content" >
             
              <p><b>Correo:</b> ${correo}</p>
              <p><b>Contraseña:</b> ${pass}</p>
              
           
        
            
            </div>
          </div>
        
        </div>
        
        
        </body>
        </html>`
        
      });
    

    } catch (error) {
     return `No se pudo enviar el correo a ${correo}` 
    }
}  

module.exports=passProvisional

