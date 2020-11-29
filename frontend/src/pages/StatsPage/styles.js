import styled from 'styled-components';

export const StatsContainer = styled.section`
  text-align: center;
`;

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: .5rem;
`;

export const StatsBox = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: 2rem;
  border: solid 1px #ccc;
  border-radius: .25rem;
  text-align: center;
  margin: .5rem;
`;

export const StatsBoxTitle = styled.div`
  font-weight: 500;
  padding: .25rem;
`;
