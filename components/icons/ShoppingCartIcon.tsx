
import React from 'react';

const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.828-6.44a1.125 1.125 0 00-.88-1.465l-9.45-2.625a1.125 1.125 0 00-1.296.906L7.5 8.25m0 6h11.25m-11.25 0a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default ShoppingCartIcon;
