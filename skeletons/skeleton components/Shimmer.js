import {
  ShimmerStyle,
  ShimmerWrapperStyle,
} from '../skeleton styles/CardItemSkeleton.style';

function Shimmer() {
  return (
    <ShimmerWrapperStyle>
      <ShimmerStyle />
    </ShimmerWrapperStyle>
  );
}

export default Shimmer;
