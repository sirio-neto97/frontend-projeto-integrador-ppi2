import React from 'react';
import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

export default function Upload(props) {
	const { onUpload } = props;
	const renderDragMessage = function(isDragActive, isDragReject) {
		if (!isDragActive) {
			return <UploadMessage>Escolha ou arraste arquivos aqui...</UploadMessage>
		}

		if (isDragReject) {
			return <UploadMessage type="error">Formato de arquivo não suportado..</UploadMessage>
		}

		return <UploadMessage type="success">Solte os arquivos aqui...</UploadMessage>
	}

	return (
		<Dropzone accept="image/*" onDropAccepted={onUpload}>
			{({getRootProps, getInputProps, isDragActive, isDragReject}) => (
				<DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
					<input {...getInputProps()}/>
					{renderDragMessage(isDragActive, isDragReject)}
				</DropContainer>
			)}
		</Dropzone>
	);
}