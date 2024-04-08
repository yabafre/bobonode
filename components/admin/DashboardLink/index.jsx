import Link from 'next/link';
import React from 'react';

// Préfixe commun pour toutes les routes du dashboard
const dashboardPathPrefix = '/admin_5dhb8A1a/dashboard';

const DashboardLink = ({ children, href, ...rest }) => {
  // Construit le chemin complet en préfixant le chemin du dashboard
  const fullPath = `${dashboardPathPrefix}${href}`;

  return (
    <Link href={fullPath} {...rest}>
      {children}
    </Link>
  );
};

export default DashboardLink;
