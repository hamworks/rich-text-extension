/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import tinycolor from 'tinycolor2';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	RichTextToolbarButton,
	__experimentalUseEditorFeature as useEditorFeature,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import { removeFormat } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { default as InlineColorUI, getActiveColor } from './inline';
import './index.css';
import { useAddingColorState, useColors } from '../shared/hooks';

const name = 'rich-text-extension/highlighter-effect';
const title = __( 'Highlighter effect' );

function TextColorEdit( { value, onChange, isActive, activeAttributes } ) {
	const allowCustomControl = useEditorFeature( 'color.custom' );
	const colors = useColors();
	const {
		isAddingColor,
		enableIsAddingColor,
		disableIsAddingColor,
	} = useAddingColorState();

	const colorIndicatorStyle = useMemo( () => {
		const activeColor = getActiveColor( name, value, colors );
		if ( ! activeColor ) {
			return undefined;
		}
		const tinyActiveColor = tinycolor( activeColor );
		return {
			color: tinyActiveColor.isDark() ? '#fff' : 'inherit',
			backgroundColor: activeColor,
		};
	}, [ value, colors ] );

	const hasColorsToChoose = ! isEmpty( colors ) || ! allowCustomControl;
	if ( ! hasColorsToChoose && ! isActive ) {
		return null;
	}

	return (
		<>
			<RichTextToolbarButton
				className="format-library-text-background-color-button"
				icon={
					<>
						<Icon
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path d="M71,408.31l68,21.77L163.09,406,117.5,360.39ZM155.78,245.1A24.87,24.87,0,0,0,148.44,271l8.87,29.12-34.63,34.64,65.44,65.44,34.58-34.59,29.06,8.9a24.91,24.91,0,0,0,25.95-7.33l24.17-28.32L184,221l-28.23,24.1ZM430,135.82l-43-43A37.31,37.31,0,0,0,336,91.25L200.61,206.82,316.06,322.27,431.62,186.91A37.32,37.32,0,0,0,430,135.82Z" />
								</svg>
							}
							style={ colorIndicatorStyle }
						/>
					</>
				}
				title={ title }
				// If has no colors to choose but a color is active remove the color onClick
				onClick={
					hasColorsToChoose
						? enableIsAddingColor
						: () => onChange( removeFormat( value, name ) )
				}
				isActive={ isActive }
			/>
			{ isAddingColor && (
				<InlineColorUI
					name={ name }
					addingColor={ isAddingColor }
					onClose={ disableIsAddingColor }
					activeAttributes={ activeAttributes }
					value={ value }
					onChange={ onChange }
				/>
			) }
		</>
	);
}

export const settings = {
	name,
	title,
	tagName: 'span',
	className: 'has-highlighter-effect',
	attributes: {
		style: 'style',
		class: 'class',
	},
	edit: TextColorEdit,
};

export default settings;
