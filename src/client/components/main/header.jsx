import React from 'react';
import { firebase, auth } from '../../../utils/firebase';

function MainHeader() {
  return (
    <div className="container">
      <div className="row">
       <div className="col-sm-12">
          <div className="inline-block-items">
            <img id="main-logo" src="Backers-White-Logo.png"/>
          </div>
          <div className="inline-block-items pull-right">
            <div className="inline-block-items" style={{ color: '#fff', marginTop: '10px' }}>
              <h6 className="inline-block-items">{auth.currentUser.displayName}</h6>
              <i className="fas fa-cog" style={{ marginLeft: '5px' }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;