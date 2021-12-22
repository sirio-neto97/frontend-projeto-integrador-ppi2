import styled from 'styled-components';

export const Container = styled.div`
	max-width: 700px;
	background: #fff;
	border-radius: 4px;
	padding: 30px;
	margin: 80px auto;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

	h1 {
		color: #f7b602;
		font-family: sans-serif;
		margin-bottom:32px;
	}
`;

export const Form = styled.form`

`;

export const SubmitButton = styled.button`
	background: #f7b602;
	padding: 8px 24px;
	border-radius: 4px;
	border: none;
	color: #fff;
`;

export const List = styled.ul`
	max-width: 600px;
	padding: 30px 0;
	list-style: none;

	li {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	& + li {
		border-top: 1px solid #ccc;
	}

	a {
		color: #f7b602;
		text-decoration: none;
	}
`;