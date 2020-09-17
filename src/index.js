import { registerFormatType } from '@wordpress/rich-text';
import { textBackGroundColor } from './text-background-color';

const { name } = textBackGroundColor;
registerFormatType( name, textBackGroundColor );
