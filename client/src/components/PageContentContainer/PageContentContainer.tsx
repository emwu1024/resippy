import React from 'react';

import './PageContentContainer.css';

const PageContentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="page-content">
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};

export default PageContentContainer;
