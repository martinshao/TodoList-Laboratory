import React, { useEffect, useMemo } from 'react';

interface Props {
  url: string;
}

export default function ChildEffect({ url = 'This is test url' }: Props) {
  const intervalId = useMemo(() => {
    return setInterval(() => {
      console.info('interval 1000s', url);
    }, 1000);
  }, [url]);

  useEffect(() => {
    return () => {
      console.info('clear interval id', intervalId);
      clearInterval(intervalId);
    };
  }, []);

  console.info('ChildEffect intervalId', intervalId);
  return (
    <>
      <h1>ChildEffect</h1>
      <div>{url}</div>
    </>
  );
}
