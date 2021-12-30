import styled from "styled-components";

export const Container = styled.div`
	padding: 2em;
	width: 80%;
`;
export const WrapperHeader = styled.div`
	display: flex;
	gap: 6px;
	margin-bottom: 30px;
`;
export const ImageWrapper = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`;

export const ImageBodyWrapper = styled.img`
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const InputWrapper = styled.div`
	display: flex;
	gap: 20px;
	margin-bottom: 3em;
`;

export const BodyWrapper = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`;

export const CustomInput = styled.input`
	height: 36px;
	width: 25em;
	&::placeholder {
		color: grey;
	}
`;

export const CustomSelect = styled.select`
	height: 40px;
	width: 100px;
	background: white;
	border: 1px solid grey;
	border-radius: 2px;
`;

export const CardWhite = styled.div`
	border: solid 1px #e7e7e7;
	background-color: #fff;
	border-radius: 0.5rem;
	padding: 20px;
	width: 20em;
	text-align: center;
`;
