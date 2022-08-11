import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CompanyFeed.css'
import React from 'react'

function CompanyFeed() {
    return (
        <div className='company-feed'>
            <div className='add-project-container'>
                <h3 className='company-feed-title'> Feed </h3> <FontAwesomeIcon className="project-done-icon" icon={faPlus} size='1x' />
            </div>

            <div className='post-container'>
                <div className='post-header'>
                    <div className='user-photo'>
                        <img className='post-profile-pic' src={'https://webapi20220126203702.azurewebsites.net/Images/' + 'steven-user-pic.png'} style={{ height: '60px', width: '60px', borderRadius: '50px' }} />
                    </div>
                    <div className='user-name'>
                        Steven Wallace
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyFeed