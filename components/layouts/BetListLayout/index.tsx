import React, { ReactChild, ReactChildren } from "react"

// Utils
import { useMediaQuery } from "react-responsive";
import FullLayout from "../fullLayOut";

// Components

interface PropsI {
  children: ReactChild | ReactChildren;
}

const BetListPageLayout = ({ children }: PropsI) => {
  const isLaptopExtremelySmall = useMediaQuery({ query: '(max-width: 800px)' })

  const numberOfItems = isLaptopExtremelySmall ? 15 : 10

  const childrenWithProps = React.Children.map(
    children,
    (child) =>
    // @ts-ignore
      React.cloneElement(child, {
        numberOfItems
      })
  );

  return (
    <FullLayout>
      {childrenWithProps}
    </FullLayout>
  );
};

export default BetListPageLayout;
