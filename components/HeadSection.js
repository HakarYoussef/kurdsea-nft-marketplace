import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  TitleStyle,
  HeaderContainer,
  HeaderWrapper,
  ImageContainer,
  BtnStyledLink,
} from '../styles/HeadSection.style';

const HeadSection = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <TitleStyle>
          <h1>Discover, collect, buy and sell NFTs. </h1>
          <p>KurdSea is the first Kurdistan based NFTs platform.</p>
          <Link href="/CreateNFT">
            <BtnStyledLink>Create NFT</BtnStyledLink>
          </Link>
        </TitleStyle>
        <ImageContainer>
          <img src="/featuredImg.jpg" />
        </ImageContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default HeadSection;
