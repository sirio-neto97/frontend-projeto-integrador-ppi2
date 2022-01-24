import styled from "styled-components";

export const DropDownContainer = styled.div`

	.dropdown button {
		height: 16px;
		width: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.dropdown button::after {
		content: none;
	}

	.dropdown-item a, .dropdown-item button {
		text-decoration: none;
		color: #383a59;
	}
`;