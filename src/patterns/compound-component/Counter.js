import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CounterProvider } from "./useCounterContext";
import { Count, Label, Decrement, Increment } from "./components";

function Counter({ children, onChange, initialValue = 0 }) {
  // the state of the count is not been controlled outside
  const [count, setCount] = useState(initialValue);

  const firstMounded = useRef(true);
  useEffect(() => {
    if (firstMounded.current) {
      firstMounded.current = false;
    }else{
      onChange && onChange(count);
    }
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  return (
    // pass value to conter provider
    <CounterProvider value={{ count, handleIncrement, handleDecrement }}>
      <StyledCounter>{children}</StyledCounter>
    </CounterProvider>
  );
}

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

Counter.Count = Count;
Counter.Label = Label;
Counter.Increment = Increment;
Counter.Decrement = Decrement;

export { Counter };
