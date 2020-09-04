<?php
/**
 * Plugin Name: Rich Text Colors
 * Version: 0.0.1
 */


add_action( 'enqueue_block_editor_assets', function() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	wp_enqueue_script(
		'rich-text-extension',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
} );
