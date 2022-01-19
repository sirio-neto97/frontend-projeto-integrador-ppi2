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
		margin-bottom:32px;
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
	li {
		color: #383a59;
		font-family: sans-serif;
		padding: 8px 16px;
	}

	width: 100%;
	list-style: none;

	li {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	a {
		color: #383a59;
	}
`;

export const Actions = styled.div`
	width: 25%;
	display: flex;
	justify-content: space-between;

	button, a {
		text-decoration: none;
		background: #383a59;
		color: #fefefe;
		border: none;
		border-radius: 4px;
		padding: 4px 8px;
		margin: 0px 8px;
		font-size: 16px;
	}
`;