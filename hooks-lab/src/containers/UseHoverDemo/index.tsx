import React from 'react';
import { useHover } from 'react-use';
export default function index() {

  const element = (hovered: any) => <div>Hover me! {hovered && 'Thanks!'}</div>;
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>
    </div>
  );
}
