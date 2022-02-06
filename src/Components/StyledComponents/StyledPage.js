import styled from 'styled-components';

export const Title = styled.h2`
	display: block;
	color: #383a59;
	font-size: 40px;
	font-weight: 400;
	padding-bottom: 24px;
`;

export const Container = styled.div`
	width: 80%;
	background: #fff;
	border-radius: 4px;
	padding: 30px;
	margin: 84px auto;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

	h1 {
		color: #383a59;
		font-family: sans-serif;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	label {
		display: block;
		color: #383a59;
	}

	input {
		padding: 8px;
		height: 32px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 100%;
	}

	input:focus {
		outline: 1px solid;
		outline-color: #5f63a3;
		outline-width: 1px;
	}

`;

export const List = styled.ul`
	background: #fff;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	list-style: none;
	padding: 0 16px;
	width: 100%;

	li {
		color: #383a59;
		font-family: sans-serif;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		background: #fff;
		margin: 8px 0;
		border: 1px solid #fff;
		border-radius: 8px;
		padding: 8px;
	}

	li.list-item:hover {
		background: #f5f5ff;
		border-color: #ccc;
		cursor: pointer;
	}

	.header-li {
		background: #f5f5ff;
		border: 1px solid #f5f5ff;
	}
`;

export const ActionsMenu = styled.ul`
	li {
		display: block;

	}

	button, a {
		text-decoration: none;
		background: #383a59;
		color: #fefefe;
		cursor: pointer;
		border: none;
		border-radius: 4px;
		padding: 4px 8px;
		margin: 0px 8px;
		font-size: 16px;
	}
`;