import React from 'react';
import styled from 'styled-components';
import { HANDS, PAYOUTS } from 'lib/poker';
import { adjustHsl } from 'styles/helpers';

const Styles = styled.div`
  margin: 0 -2rem;
`;

const Table = styled.table`
  width: 100%;
  background: ${p => adjustHsl(p.theme.colors.foreground, { a: 0.1 })};
  max-width: 80rem;
  padding: 0 1.5rem 1.75rem;
  font-size: 0.9em;
`;

const Row = styled.tr`
  padding: 0;
  line-height: 1.5;
  font-size: 0.8em;
  font-weight: bold;
  td {
    padding: 0;
  }
  th:first-child {
    text-align: left;
  }
  td:not(:first-child) {
    padding: 0 0.25rem;
    text-align: center;
  }
  &:nth-child(2) td:last-child {
    color: ${p => p.theme.colors.background};
    background: ${p => p.theme.colors.foreground};
    border-radius: 0.25rem;
  }
`;

export default function PayoutTable() {
  return (
    <Styles>
      <Table>
        <tbody>
          <Row>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Max Bet</th>
          </Row>

          {Object.entries(HANDS)
            .filter(h => h[0] !== 'zilch')
            .map(([i, hand]) => {
              const payout = PAYOUTS[hand];
              return (
                <Row key={i}>
                  <td>{hand}</td>
                  <td>{payout}</td>
                  <td>{payout * 2}</td>
                  <td>{payout * 3}</td>
                  <td>{payout * 4}</td>
                  <td>{i === 'royalFlush' ? payout * 16 : payout * 5}</td>
                </Row>
              );
            })}
        </tbody>
      </Table>
    </Styles>
  );
}
