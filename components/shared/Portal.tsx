import React, { ReactChild, ReactChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";


interface PropsI {
  children: ReactChild | ReactChildren;
  className?: string
  el?: string
}

const Portal = ({ children, className = 'root-portal', el = 'div' }: PropsI) => {
  const [container] = useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement(el);
  });

  useEffect(() => {
    container.classList.add(className)
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])
  
  return ReactDOM.createPortal(children, container)
}

export default Portal