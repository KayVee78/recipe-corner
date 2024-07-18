"use client";

//Wrapping a server side component with a client side component will still be a server side component
const ClientSideProvider = ({ children }) => {
  return <div>{children}</div>;
};

export default ClientSideProvider;
