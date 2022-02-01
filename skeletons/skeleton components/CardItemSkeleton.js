import {
  SkeletonCardBottomDetail,
  SkeletonCardContainer,
  SkeletonCardDetailsWrapper,
  SkeletonCardTopDetail,
  SkeletonImageCardWrapper,
  SkeletonOwnerWrapper,
  SkeletonPriceWrapper,
  SkeletonSellerWrapper,
  SkeletonTitleWrapper,
} from '../skeleton styles/CardItemSkeleton.style';
import Shimmer from './Shimmer';

function CardItemSkeleton() {
  return (
    <>
      <SkeletonCardContainer>
        <SkeletonImageCardWrapper />
        <SkeletonCardDetailsWrapper>
          <SkeletonCardTopDetail>
            <SkeletonTitleWrapper>
              <p></p>
              <h4></h4>
            </SkeletonTitleWrapper>
            <SkeletonPriceWrapper>
              <p></p>
              <h4></h4>
            </SkeletonPriceWrapper>
          </SkeletonCardTopDetail>
          <SkeletonCardBottomDetail>
            <SkeletonSellerWrapper>
              <p></p>
              <h4></h4>
            </SkeletonSellerWrapper>
            <SkeletonOwnerWrapper>
              <p></p>
              <h4></h4>
            </SkeletonOwnerWrapper>
          </SkeletonCardBottomDetail>
        </SkeletonCardDetailsWrapper>
        <Shimmer />
      </SkeletonCardContainer>
    </>
  );
}

export default CardItemSkeleton;
