<?php
/**
 * Plugin Name:     Rich Text Extension
 * Plugin URI:      https://github.com/team-hamworks/rich-text-extension
 * Description:     Extends rich text.
 * Author:          HAMWORKS
 * Author URI:      https://ham.works
 * License:         GPLv2 or later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     rich-text-extension
 * Domain Path:     /languages
 * Version: nightly
 */

add_action(
	'enqueue_block_editor_assets',
	function() {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
		wp_enqueue_script(
			'rich-text-extension',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_enqueue_style(
			'rich-text-extension',
			plugins_url( 'build/index.css', __FILE__ ),
			array(),
			$asset_file['version']
		);
	}
);
