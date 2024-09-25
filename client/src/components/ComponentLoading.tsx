import React from "react";

import "./styles/componentLoading.scss";

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// If a component is loading, it will render the loading component,
// otherwise it will render the result component
export default function ComponentLoading({ isLoading, children, className, style }: Props) {
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className={className ?? ""} style={style ?? {}}>
      {children}
    </div>
  );
}
