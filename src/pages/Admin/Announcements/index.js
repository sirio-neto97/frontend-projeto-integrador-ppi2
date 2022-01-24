import React, { useState, useEffect } from 'react';
import { Title, List } from '../../../Components/StyledComponents/StyledPage';
import DropDown from '../../../Components/DropDown';
import { BsTrash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import * as announcementApi from '../../../services/announcementApi';

export default function Announcements() {
	const navigate = useNavigate();
	const initialState = {
		announcements: [],
		selected: [],
		buttons: {
			deleteMass: {
				className: 'btn btn-danger disabled'
			}
		}
	};
	const [state, setState] = useState(initialState);
	const [checkAll, setCheckAll] = useState(false);

	const loadAnnouncements = async e => {
		await announcementApi.getAllForListing()
		.then(function(res) {
			if (res) {
				setState({
					...state,
					announcements: parseDataFromApi(res)
				});
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	const parseDataFromApi = function(announcements) {
		announcements = announcements ?? [];

		for (let i = 0; i < announcements.length; i++) {
			announcements[i].checked = false;
		}

		return announcements;
	}

	const handleDelete = async function(id) {
		const response = await announcementApi.remove(id);
		const announcements = state.announcements.filter(function(ad) {
			return ad.id !== id;
		});

		setState({
			...state,
			announcements: announcements
		})

		alert(response.message);
	}

	const handleDeleteMass = async function(aIds) {
		aIds = aIds ?? [];
		const response = await announcementApi.removeMass(aIds);
		const announcements = state.announcements.filter(function(ad) {
			return aIds.indexOf(ad.id) == -1;
		});

		setState({
			...state,
			announcements: announcements,
			selected: []
		})

		alert(response.message);
	}

	const handleEdit = function(id) {
		return navigate(`/admin/announcements/edit/${id}`);
	}

	const handleSelect = function(announcement) {
		announcement.checked = !announcement.checked;
		updateSelectedItems([announcement]);
	}

	const handleSelectAll = function(checked) {
		checked = !checked;
		state.announcements.map(function(item) {
			item.checked = checked;
		});

		updateSelectedItems(state.announcements);
		setCheckAll(checked);
	}

	const clearSelectedItems = function() {
		setState({
			...state,
			selected: []
		});
	}

	const updateSelectedItems = function(aAnnouncements) {
		aAnnouncements = aAnnouncements ?? [];
		var selectedIds = state.selected;
		var deleteMassClassName = 'btn btn-danger';

		aAnnouncements.map(function(announcement) {
			if(announcement.checked) {
				if (isUniqueArrayValue(announcement.id, selectedIds)) {
					selectedIds.push(announcement.id);
				}
			} else {
				selectedIds = selectedIds.filter(function(id) {
					return id != announcement.id;
				});
			}
		});

		if (!selectedIds.length) {
			deleteMassClassName = deleteMassClassName + ' disabled';
		}

		setState({
			...state,
			selected: selectedIds,
			buttons: {
				deleteMass: {
					className: deleteMassClassName
				}
			}
		});
	}

	const isUniqueArrayValue = function(value, array) {
		return array.indexOf(value) == -1;
	}

	useEffect(() => {
		loadAnnouncements();
	}, []);

	return (
		<>
			<Title>Cadastro de automóveis</Title>
			<div className="d-flex justify-content-between mb-3">
				<Link to={`/admin/announcements/add`} className="btn btn-success">+ Cadastrar</Link>
				<button className={state.buttons.deleteMass.className} title='Excluir selecionados' onClick={() => handleDeleteMass(state.selected)}><BsTrash></BsTrash></button>
			</div>
			<List>
				<li className="header-li">
					<div className="col-1">
						<input type="checkbox" name="select-all" id="select-all" onChange={() => handleSelectAll(checkAll)}/>
					</div>
					<div className="col-6">Modelo</div>
					<div className="col-1">Ano</div>
					<div className="col-3 d-none d-sm-block">Localização</div>
					<div className="col-1">Ações</div>
				</li>
				{state.announcements.map((announcement) => (
					<li className="list-item" key={announcement.id}>
						<div className="col-1">
							<input type="checkbox" checked={announcement.checked} value={announcement.id} onChange={() => handleSelect(announcement)}/>
						</div>

						<div className="col-6" onClick={() => handleEdit(announcement.id)}>{announcement.modelo} </div>
						<div className="col-1" onClick={() => handleEdit(announcement.id)}>{announcement.ano_modelo} </div>
						<div className="col-3 d-none d-sm-block" onClick={() => handleEdit(announcement.id)}>{announcement.localizacao} </div>

						<DropDown className="col-1">
							<Link to={`#`} onClick={() => handleDelete(announcement.id)}>Excluir</Link>
							<Link to={`/announcement/${announcement.id}`}>Detalhes</Link>
						</DropDown>
					</li>
				))}
			</List>
		</>
	);
}