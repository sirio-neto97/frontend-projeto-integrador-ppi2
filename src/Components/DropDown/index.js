import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { DropDownContainer } from './styles';

export default function DropDown(props) {
	return (
		<DropDownContainer>
			<DropdownButton
			drop={props.direction ?? 'down'}
			title={props.title ?? '...'}
			variant={props.variant ?? 'outline-success'}
			size={props.size ?? 'sm'}
			>
				{React.Children.map(props.children, function(child) {
					return (<Dropdown.Item>{React.cloneElement(child)}</Dropdown.Item>);
				})}
			</DropdownButton>
		</DropDownContainer>
	)
}