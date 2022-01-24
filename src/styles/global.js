import { createGlobalStyle } from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body, html {
		background: #383a59;
	}

	.btn {
		border: none;
		cursor: pointer;
		padding: 16px 36px;
		text-transform: uppercase;
		letter-spacing: 1px;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		transition: all 0.3s;
	}

	.form-group {
		padding: 16px 8px;
	}

	.form-group-btn {
		padding: 0 8px;
	}

	.w10 {
		width: 10%;
	}

	.w20 {
		width: 20%;
	}

	.w25 {
		width: 25%;
	}

	.w33 {
		width: 33%;
	}

	.w50 {
		width: 50%;
	}

	.w75 {
		width: 75%;
	}

	.w100 {
		width: 100%;
	}
`;