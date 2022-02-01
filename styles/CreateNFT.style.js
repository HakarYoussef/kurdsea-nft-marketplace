import styled from 'styled-components';

export const CreateNftContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreateNftInnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 28rem;
  padding: 30px;
  margin-top: 60px;
  border-radius: 12px;
  border: 1px dashed ${(props) => props.theme.borders};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleInput = styled.input`
  outline: none;
  height: 35px;
  color: ${(props) => props.theme.textHeader};
  background: ${(props) => props.theme.bgOne};
  border: 1px solid ${(props) => props.theme.borders};
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  ::placeholder {
    color: ${(props) => props.theme.btnPlaceHolder};
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(47, 137, 252, 0.3);
    border: 1px solid ${(props) => props.theme.btn};
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(47, 137, 252, 0.3);
  }
`;

export const PriceInput = styled.input`
  color: ${(props) => props.theme.textHeader};
  background: ${(props) => props.theme.bgOne};
  outline: none;
  height: 35px;
  border: 1px solid ${(props) => props.theme.borders};
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  ::placeholder {
    color: ${(props) => props.theme.btnPlaceHolder};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(47, 137, 252, 0.3);
    border: 1px solid ${(props) => props.theme.btn};
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(47, 137, 252, 0.3);
  }
`;

export const DescInput = styled.textarea`
  color: ${(props) => props.theme.textHeader};
  background: ${(props) => props.theme.bgOne};
  outline: none;
  height: 35px;
  border: 1px solid ${(props) => props.theme.borders};
  border-radius: 5px;
  resize: vertical;
  max-height: 200px;
  min-height: 35px;
  overflow: hidden;
  padding: 10px;
  margin: 10px 0;
  ::placeholder {
    color: ${(props) => props.theme.btnPlaceHolder};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(47, 137, 252, 0.3);
    border: 1px solid ${(props) => props.theme.btn};
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(47, 137, 252, 0.3);
  }
`;

export const UploadWrapper = styled.div`
  background-color: ${(props) => props.theme.bgTwo};
  border-radius: 10px;
  border: 1px dashed ${(props) => props.theme.borders};
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: ${(props) => props.theme.textHeader};
    margin-bottom: 10px;
    margin-top: 10px;
  }

  p {
    color: ${(props) => props.theme.btnPlaceHolder};
  }
`;
export const UploadedImagePrev = styled.div`
  img {
    padding: 5px;
    opacity: 0.6;
    width: 100px;
    border-radius: 5px;
  }
`;

export const MintBtn = styled.input`
  background-color: ${(props) => props.theme.btn};
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  border: none;
  height: 40px;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  cursor: pointer;
  transition: all 80ms ease;

  & :hover {
    background-color: ${(props) => props.theme.btnH};
  }
`;
