import React from 'react';
import { Link } from 'react-router-dom';

// type : normal ou outline

export function Button({ link, type, title }) {

  return (
      <Link to={link} className={(type === 'outline') ? 'btn btn-motoo-outline' : 'btn btn-motoo'}>{title}
      </Link>
  );
}
