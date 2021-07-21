/**
 * External dependencies
 */
import { pickBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { useCallback, useMemo } from '@wordpress/element';
import { withSpokenMessages } from '@wordpress/components';
import {
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';
import {
	ColorPalette,
	getColorClassName,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';

const colorContextName = 'highlighter-effect';
const cssProperty = '--highlighter-effect';

import ColorPopoverAtLink from '../shared/components/ColorPopoverAtLink';
import { useColors } from '../shared/hooks';

export function getActiveColor( formatName, formatValue, colors ) {
	const activeColorFormat = getActiveFormat( formatValue, formatName );
	if ( ! activeColorFormat ) {
		return;
	}
	const styleColor = activeColorFormat.attributes.style;
	if ( styleColor ) {
		return styleColor.replace( new RegExp( `^${ cssProperty }:\\s*` ), '' );
	}
	const currentClass = activeColorFormat.attributes.class;
	if ( currentClass ) {
		const colorSlug = currentClass.replace(
			new RegExp( `.*has-([^\\s]*)-${ colorContextName }.*`, '' ),
			'$1'
		);
		return getColorObjectByAttributeValues( colors, colorSlug ).color;
	}
}

const ColorPicker = ( { name, value, onChange } ) => {
	const colors = useColors();
	const onColorChange = useCallback(
		( color ) => {
			if ( color ) {
				const colorObject = getColorObjectByColorValue( colors, color );
				onChange(
					applyFormat( value, {
						type: name,
						attributes: pickBy( {
							class: getColorClassName(
								colorContextName,
								colorObject?.slug
							),
							style: `${ cssProperty }:${ color }`,
						} ),
					} )
				);
			} else {
				onChange( removeFormat( value, name ) );
			}
		},
		[ colors, onChange ]
	);
	const activeColor = useMemo( () => getActiveColor( name, value, colors ), [
		name,
		value,
		colors,
	] );

	return <ColorPalette value={ activeColor } onChange={ onColorChange } />;
};

const InlineColorUI = ( { name, value, onChange, onClose, addingColor } ) => {
	return (
		<ColorPopoverAtLink
			value={ value }
			addingColor={ addingColor }
			onClose={ onClose }
			className="components-inline-color-popover"
		>
			<ColorPicker name={ name } value={ value } onChange={ onChange } />
		</ColorPopoverAtLink>
	);
};

export default withSpokenMessages( InlineColorUI );
