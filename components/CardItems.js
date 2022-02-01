import Link from 'next/link';
import React from 'react';
import ItemDetailPage from '../pages/Creations/[id]';
import {
  CardBottomDetail,
  CardContainer,
  CardDetailsWrapper,
  CardTopDetail,
  ImageCardWrapper,
  OwnerWrapper,
  PriceWrapper,
  SellerWrapper,
  TitleWrapper,
} from '../styles/CardItems.style';

const CardItems = ({
  image,
  title,
  price,
  seller,
  owner,
  handleClick,
  itemId,
}) => {
  return (
    <CardContainer>
      <Link href={'/Creations/' + itemId}>
        <a href={'/Creations/' + itemId}>
          <ImageCardWrapper>
            <img src={image} alt="" />
          </ImageCardWrapper>
        </a>
      </Link>

      <CardDetailsWrapper>
        <CardTopDetail>
          <TitleWrapper>
            <p>Title</p>
            {title.length > 20 ? (
              <h4>{title.slice(0, 20)}...</h4>
            ) : (
              <h4>{title.slice(0, 14)}</h4>
            )}
          </TitleWrapper>
          <PriceWrapper>
            <p>Price</p>
            <h4>{price} Ξ</h4>
          </PriceWrapper>
        </CardTopDetail>
        <CardBottomDetail>
          <SellerWrapper>
            <p>Creator</p>
            <h4>{seller.slice(0, 8)}...</h4>
          </SellerWrapper>

          <OwnerWrapper>
            {owner == '0x0000000000000000000000000000000000000000' ? (
              <>
                <SellerWrapper>
                  <p>Owner</p>
                  <h4>{seller.slice(0, 8)}...</h4>
                </SellerWrapper>
              </>
            ) : (
              <>
                <SellerWrapper>
                  <p>Owner</p>
                  <h4>{owner.slice(0, 8)}...</h4>
                </SellerWrapper>
              </>
            )}
          </OwnerWrapper>
        </CardBottomDetail>
        {/* <button onClick={handleClick}>Buy</button> */}
      </CardDetailsWrapper>
    </CardContainer>
  );
};

export default CardItems;
