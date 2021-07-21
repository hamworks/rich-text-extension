import { registerFormatType } from '@wordpress/rich-text';
import textBackGroundColor from './text-background-color';
import markerPenEffect from './highlighter-effect';

registerFormatType( textBackGroundColor.name, textBackGroundColor );
registerFormatType( markerPenEffect.name, markerPenEffect );
