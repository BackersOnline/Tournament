import React from 'react';

function NavBox(props) {
  return (
    <div className="col-sm-6 text-center">
      <div id="main-navbox">
        {props.children}
      </div>
    </div>
  );
}

export default NavBox;