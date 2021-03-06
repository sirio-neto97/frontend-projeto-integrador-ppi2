import React, { useState, useEffect } from 'react';
import { Title, Form } from '../../../Components/StyledComponents/StyledPage';
import { useNavigate, useParams } from 'react-router';
import Upload from '../../../Components/Upload/index';
import FileList from '../../../Components/FileList';
import { uniqueId } from 'lodash';
import fileSize from 'filesize';

import * as announcementApi from '../../../services/announcementApi';

export default function EditAnnouncement() {
	const { id } = useParams();
	const navigate = useNavigate();
	const initialState = {
		'id': 0,
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
		});
	}

	const redirectBackPage = function() {
		return navigate(-1);
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
			'readebleSize': fileSize(file.size),
			'preview': URL.createObjectURL(file),
			'deleted': false,
			'url': null
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

	const loadAnnouncementData = async function() {
		const data = await announcementApi.getById(id)

		if (data.error) {
			alert(data.error);
			return;
		}

		if (data) {
			setState(parseDataFromApi(data));
		}
	}

	const parseDataFromApi = function(data) {
		return {
			'id': data.id,
			'formInputs': {
				'marca': data.marca,
				'modelo': data.modelo,
				'cor': data.cor,
				'placa': data.placa,
				'localizacao': data.localizacao,
				'preco': data.preco,
				'preco_fipe': data.preco_fipe,
				'quilometragem': data.quilometragem,
				'ano_modelo': data.ano_modelo,
				'ano_fabricacao': data.ano_fabricacao,
				'nro_portas': data.nro_portas,
				'situacao': data.situacao
			},
			'uploadedFiles': parseFilesFromApi(data.images)
		}
	}

	const parseFilesFromApi = function(files) {
		return files.map(file => {
			return {
				'id': file.id,
				'key': uniqueId(),
				'preview': file.path,
				'deleted': false
			}
		});
	}

	const parseDataToSave = function(data) {
		const { formInputs } = data;

		return {
			'id': parseInt(data.id),
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
		var idsToDelete = [];
		var idsToSave = [];

		const formData = new FormData();

		for (let i = 0; i < uploadedFiles.length; i++) {
			if (isFileToSave(uploadedFiles[i])) {
				idsToSave.push(uploadedFiles[i].id);
				formData.append('files', uploadedFiles[i].file);
			} else if (isFileToDelete(uploadedFiles[i])) {
				idsToDelete.push(uploadedFiles[i].id);
			}
		}

		if (idsToSave.length) {
			await announcementApi.saveFiles(formData, id);
		}

		if (idsToDelete.length) {
			await announcementApi.deleteFiles(idsToDelete);
		}
	}

	useEffect(async () => {
		await loadAnnouncementData();
	}, []);

	const isFileToSave = function (objFile) {
		var fileId = parseInt(objFile.id);

		return !fileId && !isFileToDelete(objFile);
	}

	const isFileToDelete = function (objFile) {
		return Boolean(objFile.deleted);
	}

	return(
		<>
			<Title>Editar autom??vel</Title>
			<Form onSubmit={handleSubmit}>
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
					<label htmlFor="localizacao">Localiza????o</label>
					<input type="text" name="localizacao" id="localizacao" value={state.formInputs.localizacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="preco">Pre??o</label>
					<input type="text" name="preco" id="preco" value={state.formInputs.preco} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="preco_fipe">Pre??o FIPE</label>
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
					<label htmlFor="ano_fabricacao">Ano Fabrica????o</label>
					<input type="number" name="ano_fabricacao" id="ano_fabricacao" value={state.formInputs.ano_fabricacao} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="nro_portas">N??mero de Portas</label>
					<input type="number" name="nro_portas" id="nro_portas" value={state.formInputs.nro_portas} onChange={handleChange} required/>
				</div>

				<div className="form-group w25">
					<label htmlFor="situacao">Situa????o</label>
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
					<button className="btn btn-success me-3">Salvar</button>
					<div onClick={() => navigate(-1)} className="btn btn-danger">Voltar</div>
				</div>
			</Form>
		</>
	);
}