import React, { useState, useEffect } from 'react';
import { Title, Form } from '../../../Components/StyledComponents/StyledPage';
import Container from '../../../Components/Layout/Container';
import * as companyApi from '../../../services/companyApi';

export default function CreateAnnouncement() {
	const initialState = {
		'nome': '',
		'cnpj': '',
		'localizacao': '',
		'email': '',
		'telefone': '',
		'sobre': '',
		'whatsapp': '',
		'instagram': '',
		'facebook': ''
	};

	const [state, setState] = useState(initialState);

	useEffect(() => {
		loadCompanyData();
	}, []);

	const loadCompanyData = async function() {
		return await companyApi.getCompany()
		.then(function(res) {
			if (res) {
				setState(res);
			}
		});
	}

	const handleSubmit = async function(e) {
		e.preventDefault();
		await companyApi.save(state)
		.then(function(res) {
		});
	}

	const handleChange = function(e) {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	return(
		<>
			<Title>Dados da empresa</Title>
			<Container className="d-flex align-items-center col-12 bg-white">
				<Form className="col-12" onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
						<div className="form-group border col-6">
							<h3>Empresa</h3>
							<div className="form-group">
								<label htmlFor="nome">Nome da empresa</label>
								<input className="form-control" type="text" name="nome" id="nome" value={state.nome} onChange={handleChange} required/>
							</div>

							<div className="form-group">
								<label htmlFor="cnpj">CNPJ</label>
								<input className="form-control" type="text" name="cnpj" id="cnpj" value={state.cnpj} onChange={handleChange} required/>
							</div>

							<div className="form-group">
								<label htmlFor="localizacao">Endereço</label>
								<input className="form-control" type="text" name="localizacao" id="localizacao" value={state.localizacao} onChange={handleChange} required/>
							</div>

							<div className="form-group col-12">
								<label htmlFor="sobre">Sobre a empresa</label>
								<textarea className="form-control" name="sobre" id="sobre" value={state.sobre} onChange={handleChange} required/>
							</div>
						</div>

						<div className="form-group border col-6">
							<h3>Contatos</h3>
							<div className="form-group">
								<label htmlFor="email">E-mail para contato</label>
								<input className="form-control" type="text" name="email" id="email" value={state.email} onChange={handleChange} required/>
							</div>

							<div className="form-group">
								<label htmlFor="telefone">Telefone para contato</label>
								<input className="form-control" type="text" name="telefone" id="telefone" value={state.telefone} onChange={handleChange} required/>
							</div>

							<div className="form-group">
								<label htmlFor="whatsapp">Whatsapp</label>
								<input className="form-control" type="text" name="whatsapp" id="whatsapp" value={state.whatsapp} onChange={handleChange} required/>
							</div>

							<div className="form-group">
								<label htmlFor="instagram">Instagram</label>
								<input className="form-control" type="text" name="instagram" id="instagram" value={state.instagram} onChange={handleChange} required/>
							</div>

							<div className="form-group">
								<label htmlFor="facebook">Facebook</label>
								<input className="form-control" type="text" name="facebook" id="facebook" value={state.facebook} onChange={handleChange} required/>
							</div>
						</div>

						<div className="form-group-btn w50">
							<button className="btn btn-success">Salvar</button>
						</div>
				</Form>
			</Container>
		</>
	);
}