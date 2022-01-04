import styled from "styled-components";

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 680px;
    overflow: scroll;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
    }
  }
  fieldset::-webkit-scrollbar {
    width: 12px;
  }
  fieldset::-webkit-scrollbar-track {
    background: var(--white);
  }
  fieldset::-webkit-scrollbar-thumb {
    background-color: var(--red);
    border-radius: 6px;
    border: 3px solid var(--white);
  }
  .shehad {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

export default OrderStyles;
