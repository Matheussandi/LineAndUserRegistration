import styled from 'styled-components';

export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.5rem 1rem;
`

export const Form = styled.form`
    margin: 0 auto;
    background-color: #3a3a3c;
    border-radius: 0.5rem;
    padding: 0.5rem;
`

export const Table = styled.table`
    margin-top: 2rem;
    color: var(--background);
    width: 100%;
    border-spacing: 0 0.5rem;
    font-family: Poppins;
    

    th {
        color: var(--background);
        font-weight:400;
        padding: 1rem 2rem;
        text-align: left;
        line-height:1.5rem;
        border: 2px solid #fff;
        text-align: center;
    }

    td {
        padding: 1rem 2rem;
        border: 0;
        background: var(--shape);
        color: var(--background);
        border-radius: 0.25rem;
        border: 2px solid #fff;
        text-align: center;
    }
`

export const ButtonIcon = styled.button`
    background-color: var(--green);
    color: white;
    height: 3rem;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 0.25rem;
    margin-right: 0.5rem;

    &:hover {
        filter: brightness(0.9);
        transition-duration: 0.5s;
    }
`

export const ButtonClose = styled.button`
    background-color: var(--green);
    color: white;
    height: 2.5rem;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    border: 0;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    float: right;

    &:hover {
        filter: brightness(0.9);
        transition-duration: 0.5s;
    }
`