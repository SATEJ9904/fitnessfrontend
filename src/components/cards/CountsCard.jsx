import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${"#fff"};
  border-radius: 14px;
  display: flex;
  gap: 6px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 6px;
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
const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  color: ${"#fff"};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;
const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const Span = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }

  ${({ positive, theme }) =>
    positive
      ? `
  color: ${theme.green};`
      : `
  color: ${theme.red};`}
`;
const Icon = styled.div`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, bg }) => `
  background: ${bg};
  color: ${color};
  `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${"#fff"};
  margin-bottom: 6px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const CountsCard = ({ item, data }) => {
  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          {data && data[item.key]} 
          <Unit>{item.unit}</Unit>
          {
            data[item.key] ? <Span positive>(+10%)</Span> :null
          }
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.lightColor}>
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard;
