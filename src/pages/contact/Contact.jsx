import React from 'react'
import './Contact.css'

export const Contact = () => {
  return (
    
    <div className='cuerpo'>
        <section id="intro">
        <h1>¡Hola y bienvenidos a mi página de contacto!</h1>
        <p>
            Soy [Nombre de la Abogada], y me dedico a la defensa y representación legal en el área de [especificar el tipo de derecho, por ejemplo: derecho familiar, penal, laboral, etc.]. Si estás aquí, probablemente busques alguien que pueda guiarte y asistirte en tu proceso legal. Te entiendo, y quiero que sepas que estás en las manos adecuadas.
        </p>
    </section>

    <section id="details">
        <h2>Mis Detalles de Contacto:</h2>
        <ul>
            <li><strong>Dirección:</strong> [Mi dirección del despacho o la oficina]</li>
            <li><strong>Teléfono:</strong> [Mi número de teléfono]</li>
            <li><strong>Correo Electrónico:</strong> [Mi correo electrónico]</li>
        </ul>
        <h2>Mis Horarios de Atención:</h2>
        <p>De [hora de inicio] a [hora de finalización], [días de la semana, por ejemplo: Lunes a Viernes]</p>
    </section>

    <section id="form">
        <h2>Formulario de Contacto:</h2>
        <p>Si prefieres, puedes dejarme tus detalles y tu consulta a través del siguiente formulario. Prometo responder a la brevedad posible.</p>
        <form action="[URL_DONDE_SE_ENVIARA_EL_FORMULARIO]" method="post">
            <div>
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required/>                                  
            </div>
            <div>
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required/>
            </div>
            <div>
                <label for="subject">Asunto:</label>
                <input type="text" id="subject" name="subject"/>
            </div>
            <div>
                <label for="message">Mensaje:</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <div>
                <input type="submit" value="Enviar"/>
            </div>
        </form>
    </section>

    <section id="location">
        <h2>¿Dónde Estoy Ubicada?</h2>
        <p>[Aquí puedes insertar el código de un mapa interactivo, por ejemplo, un iframe de Google Maps con la ubicación de tu despacho.]</p>
    </section>

    <footer>
        <p>Te agradezco por considerarme y confiar en mi experiencia y profesionalismo. Tu tranquilidad y bienestar son esenciales para mí. ¡Espero poder ayudarte pronto!</p>
    </footer>
    </div>

    
  )
}
