import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      //auto: with the content
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      //90vw, display width
      //90% of the content that is 1fr
      width: 90%;
    }
  }
`;
export default Wrapper;
