import React from 'react';
import { ImagesList, FileInfo, Preview } from './styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';

export default function FileList({files, onDelete}) {
	return (
		<ImagesList>
			{files.map(uploadedFile => (
				!uploadedFile.deleted && (
					<li key={uploadedFile.key}>
						<FileInfo>
							<Preview src={uploadedFile.preview}/>
							<div>
								<strong>{uploadedFile.name}</strong>
								<div className="file-data">
									{uploadedFile.readebleSize}
									<div className="btn-trash" onClick={() => onDelete(uploadedFile.key)}>
										<BsTrash />
									</div>
								</div>
							</div>
						</FileInfo>

						<div>
							{!uploadedFile.uploaded && !uploadedFile.error && (
								<CircularProgressbar styles={{
									root: {	width: 40 },
									path: { stroke: '#383a59' },
									text: { fill: '#383a59', fontSize: '24px'}
								}}
								value={uploadedFile.progress}
								text={`${uploadedFile.progress}%`}
								strokeWidth={10}
								/>
							)}

							{uploadedFile.url &&(
								<a href={uploadedFile.preview} target="_blank" rel="noopener noreferrer">
									<MdLink size={24} color="#222"/>
								</a>
							)}

							{uploadedFile.uploaded && (
								<MdCheckCircle size={24} color="#78e5d5"/>
							)}

							{uploadedFile.error && (
								<MdError size={24} color="#e57878"/>
							)}
						</div>
					</li>
				)
			))}
		</ImagesList>
	);
}