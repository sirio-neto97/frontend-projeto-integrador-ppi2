import React from 'react';
import { ImagesList, FileInfo, Preview } from './styles';
import { BsTrash } from 'react-icons/bs';

export default function FileList({files, onDelete}) {
	return (
		<ImagesList>
			{files.map(uploadedFile => (
				!uploadedFile.deleted && (
					<li key={uploadedFile.key}>
						<FileInfo>
							<Preview src={uploadedFile.preview} className="preview"/>
							<div>
								<div className="file-data">
									{uploadedFile.readebleSize}
									<div className="btn-trash" onClick={() => onDelete(uploadedFile.key)}>
										<BsTrash />
									</div>
								</div>
							</div>
						</FileInfo>
					</li>
				)
			))}
		</ImagesList>
	);
}