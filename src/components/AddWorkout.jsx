import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${"#fff"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${"#fff"};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  color: ${"#ffffff"}; /* Text color */
  background: ${({ theme }) => theme.background_secondary || "#121212"}; /* Background color */
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary || "#ffffff"}; /* Placeholder color */
    opacity: 0.7;
  }
`;

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <StyledTextArea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
        value={workout}
        onChange={(e) => setWorkout(e.target.value)}
        color="#fff"
      />
      <Button
        text="Add Workout"
        small
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;
