import styled from 'styled-components';

export const Container = styled.button`
    width: 50%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    margin-left: 25%;

    &:hover {
        filter: brightness(0,9);
    }
`