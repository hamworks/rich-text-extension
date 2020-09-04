/**
 * External dependencies
 */
import { get, isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useCallback, useMemo, useState } from '@wordpress/element';
import {
	RichTextToolbarButton,
	__experimentalUseEditorFeature as useEditorFeature,
} from '@wordpress/block-editor';
import { Icon, textColor as textColorIcon, brush } from '@wordpress/icons';
import { removeFormat, registerFormatType } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { default as InlineColorUI, getActiveColor } from './inline';

const name = 'rich-text-background-colors/text-background-color';
const title = __( 'Text Background Color' );

const EMPTY_ARRAY = [];

function TextColorEdit( { value, onChange, isActive, activeAttributes } ) {

	const allowCustomControl = useEditorFeature( 'color.custom' );
	const { colors } = useSelect( ( select ) => {
		const blockEditorSelect = select( 'core/block-editor' );
		let settings;
		if ( blockEditorSelect && blockEditorSelect.getSettings ) {
			settings = blockEditorSelect.getSettings();
		} else {
			settings = {};
		}
		return {
			backgroundColor: get( settings, [ 'colors' ], EMPTY_ARRAY ),
		};
	} );
	const [ isAddingColor, setIsAddingColor ] = useState( false );
	const enableIsAddingColor = useCallback( () => setIsAddingColor( true ), [
		setIsAddingColor,
	] );
	const disableIsAddingColor = useCallback( () => setIsAddingColor( false ), [
		setIsAddingColor,
	] );
	const colorIndicatorStyle = useMemo( () => {
		const activeColor = getActiveColor( name, value, colors );
		console.log(activeColor)
		if ( ! activeColor ) {
			return undefined;
		}
		return {
			backgroundColor: activeColor,
		};
	}, [ value, colors ] );

	console.log(colorIndicatorStyle)

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
						<Icon icon={ brush } />
						{ isActive && (
							<span
								className="format-library-text-background-color-button__indicator"
								style={ colorIndicatorStyle }
							/>
						) }
					</>
				}
				title={title}
				// If has no colors to choose but a color is active remove the color onClick
				onClick={
					hasColorsToChoose
						? enableIsAddingColor
						: () => onChange( removeFormat( value, name ) )
				}
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

export const textColor = {
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


registerFormatType( name, textColor );
