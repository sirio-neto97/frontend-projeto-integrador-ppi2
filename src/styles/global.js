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

	.back-btn {
		background: #e74c3c;
		color: #fff;
		border-radius: 4px;
	}

	.back-btn:hover {
		background: rgba(161, 5, 5, 0.8);
	}

	.success-btn {
		background: #32a852;
		color: #fff;
		border-radius: 4px;
	}

	.success-btn:hover {
		background: rgba(34, 115, 56, 0.8);
	}

	.btn {
		border: none;
		font-size: inherit;
		cursor: pointer;
		padding: 16px 36px;
		display: inline-block;
		margin: 16px;
		text-transform: uppercase;
		text-decoration: none;
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