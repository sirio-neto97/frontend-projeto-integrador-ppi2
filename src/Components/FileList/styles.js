import styled from 'styled-components';

export const ImagesList = styled.ul`
	margin-top: 20px;
	display: flex;

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 25%;
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
		margin-top: -59px;
		cursor: pointer;
		transition: 0.1s;
	}

	div.btn-trash:hover {
		background: #e57878;
		color: #fefefe;
	}
`;

export const Preview = styled.div`
	width: 72px;
	height: 72px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	margin-right: 10px;
`;