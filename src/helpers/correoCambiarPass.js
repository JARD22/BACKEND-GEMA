const nodemailer = require('nodemailer');


const contrasenaCorreo = async(pass,correo)=>{
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
        subject: "Recuperar Contraseña", // Subject line
        html: 
        `<html>
        <head>
               
        </head>
        <body>
        
        <div class="container">
          <div class="card">
            
              <h2>Reestablecer Contraseña</h2>
              <h4>GEMA</h4>
              <h4>Contraseña Provisional</h4>
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

module.exports=contrasenaCorreo
