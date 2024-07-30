import React from 'react'
import { MapPin, Smartphone, Mail, Facebook, Instagram, PhoneCall, Phone } from 'react-feather'


import "./AvatarsGallery.css"

function Card({icon, name, position, igLink}) {
  return ( 
    <div className="avatar">
      <img 
        className='icon'
        src={icon}
        alt='Avatar'
      />
      <h3 className='nameMember'>{name}</h3>
      <h4>{position}</h4>
      <h6>
        <a className='instagramMember' href={igLink} target="_blank" rel="noopener noreferrer">
        <Instagram /> {igLink}
        </a>
      </h6>
    </div>
   );
}

export default Card;