import React from 'react';
import { graphql } from 'gatsby';
import Avatars from '../components/Avatars'
import "./AvatarsGallery.css"

function AvatarsGallery () {
  
const avatar1 = '../img/avatar-DavidBercovici.jpg';
const avatar2 = '../img/avatar-user1.jpg';
const avatar3 = 'https://ucarecdn.com/b70bd6cf-acdc-403e-ac22-8caa5ac1a6f2/teammember2.jpg';
const avatar4 = '../img/avatar-user2.jpg';

const name1 = 'David Bercovici'
const name2 = 'Carlos Castro'
const name3 = 'Maria Jose Proaño'
const name4 = 'Diego Meneses'
const position1 = 'Lead Designer, CMO'
const position2 = 'Graphic Designer'
const position3 = 'Legal Advisor'
const position4 = 'Logistics Manager'
const igLink1 = 'davidberco'
const igLink2 = 'graphcarcas'
const igLink3 = 'majopro23'
const igLink4 = 'diegoAlMeneses'

return (
  <div className="section">
    <h3 className='avatar-main-title'>The Team</h3>
    <div className='avatar-container'>
      <div className="avatar-card">
        <Avatars icon={avatar1} name={name1} position={position1} igLink={igLink1}
        />
      </div>
      <div className="avatar-card">
        <Avatars icon={avatar2} name={name2} position={position2} igLink={igLink2}
        />
      </div>
      <div className="avatar-card">
        <Avatars icon={avatar3} name={name3} position={position3} igLink={igLink3}
        />
      </div>
      <div className="avatar-card">
        <Avatars icon={avatar4} name={name4} position={position4} igLink={igLink4}
        />
      </div>
    </div>
  </div>
)
  
};

export default AvatarsGallery;

export const avatarQuery = graphql`
query AvatarQuery {
  allMarkdownRemark {
    nodes {
      frontmatter {
        title
      }
    }
  }
}
`