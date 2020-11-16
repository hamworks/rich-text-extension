import { get } from 'lodash';
import { useSelect } from '@wordpress/data';
import { useCallback, useState } from '@wordpress/element';

export function useColors() {
	return useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return get( getSettings(), [ 'colors' ], [] );
	} );
}

export function useAddingColorState() {
	const [ isAddingColor, setIsAddingColor ] = useState( false );
	const enableIsAddingColor = useCallback( () => setIsAddingColor( true ), [
		setIsAddingColor,
	] );
	const disableIsAddingColor = useCallback( () => setIsAddingColor( false ), [
		setIsAddingColor,
	] );

	return {
		isAddingColor,
		enableIsAddingColor,
		disableIsAddingColor,
	};
}
