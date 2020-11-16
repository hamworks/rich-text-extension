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
import { Icon, brush } from '@wordpress/icons';
import { removeFormat } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { default as InlineColorUI, getActiveColor } from './inline';
import { useAddingColorState, useColors } from '../shared/hooks';

const name = 'rich-text-extension/text-background-color';
const title = __( 'Text Background Color' );

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
						<Icon icon={ brush } style={ colorIndicatorStyle } />
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

const settings = {
	name,
	title,
	tagName: 'span',
	className: 'has-inline-background-color',
	attributes: {
		style: 'style',
		class: 'class',
	},
	edit: TextColorEdit,
};

export default settings;
