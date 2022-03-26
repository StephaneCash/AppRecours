import React from "react";
import styled from "styled-components";
import Earnings from "./Earnings";
import Info from "./Info";
import NavBar from "./NavBar";

function MainContent() {
    return (
        <Container>
            <NavBar />
            <SubContainer>
                <SectionOne>
                    <ColonneOne1>
                        <Earnings />
                        <Info />
                    </ColonneOne1>
                    <ColonneTwo1></ColonneTwo1>
                </SectionOne>

                <SectionTwo>
                    <ColonneOne2></ColonneOne2>
                    <ColonneTwo2></ColonneTwo2>
                </SectionTwo>
            </SubContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 80%;
    background: linear-gradient(to bottom right, white 0%right, #e6e4ff 70%);
    border-bottom-right-radius: 2rem;
    border-top-right-radius: 2rem;
    margin: 1rem 8rem 1rem 4rem;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 1rem 0 0 0;
    }
`;

const SubContainer = styled.div`
    margin: 0.5rem 0;
    height: 80;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        height: 100%;
    }
`;

const TitleText = styled.h3`
    height: 100%;
`;

const SectionOne = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40%;
    gap: 2rem;
    width: 100%;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        flex-direction: column;
        align-items: center;
        height: max-content;
    }
`;

const ColonneOne1 = styled.div`
    display: flex;
    gap: 3rem;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }
`;
const ColonneTwo1 = styled.div`
    display: flex;
    flex-direction: column;
    heignt: 115%;
    width: 100%;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        height: max-content;
        justify-content: center;
        align-items: center;
    }
`;

const SectionTwo = styled.div`
    display: flex;
    gap: 2rem;
    height: 26vh;
`;

const ColonneOne2 = styled.div``;
const ColonneTwo2 = styled.div``;


export default MainContent;