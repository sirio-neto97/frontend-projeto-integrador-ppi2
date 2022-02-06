import { createGlobalStyle } from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body, html {
		background: #f5f5ff;
		height: 100%;
	}
	#root {
		height: 100%;
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