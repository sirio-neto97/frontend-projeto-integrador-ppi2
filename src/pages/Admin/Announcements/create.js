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
			'marca': 'Fiat',
			'modelo': 'Palio',
			'cor': 'Branco',
			'placa': 'AAA1234',
			'localizacao': 'BG-RS',
			'preco': 27000.000,
			'preco_fipe':32000.000,
			'quilometragem': 70000,
			'ano_modelo': '2015',
			'ano_fabricacao': '2015',
			'nro_portas': 4,
			'situacao': 1
		},
		'uploadedFiles': []
	};
	const [state, setState] = useState(initialState);

	const handleSubmit = async function(e) {
		e.preventDefault();
		return await announcementApi.save(parseDataToSave(state))
		.then(function(res) {
			saveAnnouncementFiles(res.id, state.uploadedFiles);
			return redirectBackPage();
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
			<Title>Cadastrar autom??vel</Title>
			<Form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
				<div className="form-group w25">
					<label htmlFor="marca">Marca</label>
					<input type="text" className="form-control" name="marca" id="marca" value={state.formInputs.marca} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="modelo">Modelo</label>
					<input type="text" className="form-control" name="modelo" id="modelo" value={state.formInputs.modelo} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="cor">Cor</label>
					<input type="text" className="form-control" name="cor" id="cor" value={state.formInputs.cor} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="placa">Placa</label>
					<input type="text" className="form-control" name="placa" id="placa" value={state.formInputs.placa} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="localizacao">Localiza????o</label>
					<input type="text" className="form-control" name="localizacao" id="localizacao" value={state.formInputs.localizacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="preco">Pre??o</label>
					<input type="text" className="form-control" name="preco" id="preco" value={state.formInputs.preco} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="preco_fipe">Pre??o FIPE</label>
					<input type="text" className="form-control" name="preco_fipe" id="preco_fipe" value={state.formInputs.preco_fipe} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="quilometragem">Km</label>
					<input type="number" className="form-control" name="quilometragem" id="quilometragem" value={state.formInputs.quilometragem} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="ano_modelo">Ano Modelo</label>
					<input type="number" className="form-control" name="ano_modelo" id="ano_modelo" value={state.formInputs.ano_modelo} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="ano_fabricacao">Ano Fabrica????o</label>
					<input type="number" className="form-control" name="ano_fabricacao" id="ano_fabricacao" value={state.formInputs.ano_fabricacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="nro_portas">N??mero de Portas</label>
					<input type="number" className="form-control" name="nro_portas" id="nro_portas" value={state.formInputs.nro_portas} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="situacao">Situa????o</label>
					<select className="form-control" name="situacao" id="situacao" value={state.formInputs.situacao} onChange={handleChange}>
						<option value="1">Dispon??vel</option>
						<option value="2">Vendido</option>
						<option value="3">Reservado</option>
					</select>
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