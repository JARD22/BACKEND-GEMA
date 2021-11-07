const nodemailer = require('nodemailer');


const passProvisional = async(pass,correo)=>{

console.log(pass)
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
        <style>
            body{
              display: flex;
              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
        
            .container{
              position: relative;
              width: 1150px;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
            }
        
            .container .card{
              position: relative;
              width: 400px;
              height: 520px;
              background: #fff;
              margin: 20px;
              border-radius: 20px;
              overflow:hidden;
              box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
            }

            .container .card  h2 {
              color: #666;
              font-size: 1.6em;
              
            }
            .container .card  h4 {
              color: #666;
              font-size: 1em;
              padding:5px 0 ;
            }
            
            .container .card .content {
              position: absolute;
              bottom: 10px;
              padding: 20px;
              text-align: center;
            }
            
            .container .card .content p {
              color: #666;
              text-align: justify;
             
            }
            .container .card .content a {
             position: relative;
             display: inline-block;
             padding: 10px 20px;
             background:rgba(140, 80, 255);
             color: #666;
             border-radius: 40px;
             text-decoration: none;
             margin-top: 20px;
             margin-left: 100px;
            }    
          </style>
        
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
              
              <a href="#">Iniciar Sesión </a>
        
            
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

