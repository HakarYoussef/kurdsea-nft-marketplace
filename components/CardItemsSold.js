import Link from 'next/link';
import React from 'react';
import {
  SoldBadge,
  SoldCardBottomDetail,
  SoldCardContainer,
  SoldCardDetailsWrapper,
  SoldCardTopDetail,
  SoldImageCardWrapper,
  SoldOwnerWrapper,
  SoldPriceWrapper,
  SoldSellerWrapper,
  SoldTitleWrapper,
} from '../styles/CardItemsSold.style';

const CardItemsSold = ({
  image,
  title,
  price,
  seller,
  owner,
  handleClick,
  itemId,
}) => {
  return (
    <SoldCardContainer>
      <SoldBadge>
        <p>SOLD</p>
      </SoldBadge>
      <Link href={'/Creations/' + itemId}>
        <a href={'/Creations/' + itemId}>
          <SoldImageCardWrapper>
            <img src={image} alt="" />
          </SoldImageCardWrapper>
        </a>
      </Link>

      <SoldCardDetailsWrapper>
        <SoldCardTopDetail>
          <SoldTitleWrapper>
            <p>Title</p>
            {title.length > 20 ? (
              <h4>{title.slice(0, 20)}...</h4>
            ) : (
              <h4>{title.slice(0, 14)}</h4>
            )}
          </SoldTitleWrapper>
          <SoldPriceWrapper>
            <p>Price</p>
            <h4>{price} Ξ</h4>
          </SoldPriceWrapper>
        </SoldCardTopDetail>
        <SoldCardBottomDetail>
          <SoldSellerWrapper>
            <p>Creator</p>
            <h4>{seller.slice(0, 8)}...</h4>
          </SoldSellerWrapper>
          <SoldOwnerWrapper>
            <p>Owner</p>
            <h4>{owner.slice(0, 8)}...</h4>
          </SoldOwnerWrapper>
        </SoldCardBottomDetail>
        {/* <button onClick={handleClick}>Buy</button> */}
      </SoldCardDetailsWrapper>
    </SoldCardContainer>
  );
};

export default CardItemsSold;
