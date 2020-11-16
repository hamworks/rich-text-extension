import { get } from 'lodash';
import { useSelect } from '@wordpress/data';

export default function useColors() {
	return useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return get( getSettings(), [ 'colors' ], [] );
	} );
}
