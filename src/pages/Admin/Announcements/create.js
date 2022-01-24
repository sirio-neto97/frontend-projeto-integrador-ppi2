import React, { useState } from 'react';
import { Title, Form } from '../../../Components/StyledComponents/StyledPage';
import { useNavigate } from 'react-router';
import Upload from '../../../Components/Upload/index';
import FileList from '../../../Components/FileList';
import { uniqueId } from 'lodash';
import fileSize from 'filesize';

import * as announcementApi from '../../../services/announcementApi';

export default function CreateAnnouncement() {
	const navigate = useNavigate();
	const initialState = {
		'formInputs': {
			'marca': 'A',
			'modelo': 'A',
			'cor': 'A',
			'placa': 'A',
			'localizacao': 'A',
			'preco': 0.00,
			'preco_fipe': 0.00,
			'quilometragem': 0,
			'ano_modelo': '123',
			'ano_fabricacao': '123',
			'nro_portas': 4,
			'situacao': 1
		},
		'uploadedFiles': []
	};
	const [state, setState] = useState(initialState);

	const handleSubmit = async function(e) {
		e.preventDefault();
		await announcementApi.save(parseDataToSave(state))
		.then(function(res) {
			saveAnnouncementFiles(res.id, state.uploadedFiles);
			return redirectBackPage();
		})
		.catch(function(error) {
			alert(error);
			return;
		});
	}

	const handleChange = function(e) {
		setState({
			...state,
			formInputs: {
				...state.formInputs,
				[e.target.name]: e.target.value
			}
		});
	}

	const handleUpload = function(files) {
		const uploaded = files.map(file => ({
			'id': 0,
			'file': file,
			'key': uniqueId(),
			'name': file.name,
			'readebleSize': fileSize(file.size),
			'preview': URL.createObjectURL(file),
			'deleted': false
		}));

		setState({
			...state,
			uploadedFiles: state.uploadedFiles.concat(uploaded)
		});
	}

	const handleDeleteFile = function(key) {
		setState({
			...state,
			uploadedFiles: state.uploadedFiles.map(file => {
				if (file.key === key) {
					file.deleted = true;
				}
				return file;
			})
		});
	}

	const parseDataToSave = function(data) {
		const { formInputs } = data;

		return {
			'marca': String(formInputs.marca),
			'modelo': String(formInputs.modelo),
			'cor': String(formInputs.cor),
			'placa': String(formInputs.placa),
			'localizacao': String(formInputs.localizacao),
			'preco': parseFloat(formInputs.preco),
			'preco_fipe': parseFloat(formInputs.preco_fipe),
			'quilometragem': parseInt(formInputs.quilometragem),
			'ano_modelo': parseInt(formInputs.ano_modelo),
			'ano_fabricacao': parseInt(formInputs.ano_fabricacao),
			'nro_portas': parseInt(formInputs.nro_portas),
			'situacao': parseInt(formInputs.situacao)
		}
	}

	const saveAnnouncementFiles = async function(id, uploadedFiles) {
		id = id || 0;
		uploadedFiles = uploadedFiles || [];

		const formData = new FormData();

		for (let i = 0; i < uploadedFiles.length; i++) {
			formData.append('files', uploadedFiles[i].file);
		}

		await announcementApi.saveFiles(formData, id);
	}

	const redirectBackPage = function() {
		return navigate(-1);
	}

	return(
		<>
			<Title>Cadastrar automóvel</Title>
			<Form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
				<div className="form-group w25">
					<label htmlFor="marca">Marca</label>
					<input type="text" name="marca" id="marca" value={state.formInputs.marca} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="modelo">Modelo</label>
					<input type="text" name="modelo" id="modelo" value={state.formInputs.modelo} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="cor">Cor</label>
					<input type="text" name="cor" id="cor" value={state.formInputs.cor} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="placa">Placa</label>
					<input type="text" name="placa" id="placa" value={state.formInputs.placa} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="localizacao">Localização</label>
					<input type="text" name="localizacao" id="localizacao" value={state.formInputs.localizacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="preco">Preço</label>
					<input type="text" name="preco" id="preco" value={state.formInputs.preco} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="preco_fipe">Preço FIPE</label>
					<input type="text" name="preco_fipe" id="preco_fipe" value={state.formInputs.preco_fipe} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="quilometragem">Km</label>
					<input type="number" name="quilometragem" id="quilometragem" value={state.formInputs.quilometragem} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="ano_modelo">Ano Modelo</label>
					<input type="number" name="ano_modelo" id="ano_modelo" value={state.formInputs.ano_modelo} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="ano_fabricacao">Ano Fabricação</label>
					<input type="number" name="ano_fabricacao" id="ano_fabricacao" value={state.formInputs.ano_fabricacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="nro_portas">Número de Portas</label>
					<input type="number" name="nro_portas" id="nro_portas" value={state.formInputs.nro_portas} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="situacao">Situação</label>
					<input type="text" name="situacao" id="situacao" value={state.formInputs.situacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w100">
					<label>Imagens</label>
					<Upload onUpload={handleUpload}/>
					{ state.uploadedFiles.length > 0 && (
						<FileList files={state.uploadedFiles} onDelete={handleDeleteFile}/>
					) }
				</div>

				<div className="form-group-btn w50">
					<button className="btn btn-success">Salvar</button>
					<div onClick={() => navigate(-1)} className="btn btn-danger">Voltar</div>
				</div>
			</Form>
		</>
	);
}