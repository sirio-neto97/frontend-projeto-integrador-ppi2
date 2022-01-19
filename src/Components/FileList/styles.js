import styled from 'styled-components';

export const ImagesList = styled.ul`
	margin-top: 20px;

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& + li {
		margin-top: 16px;
	}
`;

export const FileInfo = styled.div`
	display: flex;
	align-items: center;

	div {
		display: flex;
		flex-direction: column;
	}

	div.file-data {
		font-size: 14px;
		color: #999;
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	div.btn-trash {
		border: 1px solid #e57878;
		border-radius: 2px;
		font-size: 12px;
		padding: 2px;
		background : transparent;
		color: #e57878;
		margin-left: 5px;
		cursor: pointer;
		transition: 0.1s;
	}

	div.btn-trash:hover {
		background: #e57878;
		color: #fefefe;
	}
`;

export const Preview = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 4px;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	margin-right: 10px;
`;