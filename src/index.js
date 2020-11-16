import { registerFormatType } from '@wordpress/rich-text';
import textBackGroundColor from './text-background-color';
import markerPenEffect from './marker-pen-effect';

registerFormatType( textBackGroundColor.name, textBackGroundColor );
registerFormatType( markerPenEffect.name, markerPenEffect );
