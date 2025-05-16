import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Future Header can go here */}
      <main>{children}</main>
      {/* Future Footer can go here */}
    </>
  );
};

export default Layout; 