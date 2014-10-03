<?php

  // Set Twig template directory
	if ( class_exists( 'Timber' ) ) {
		Timber::$dirname = 'views';
	}

	// Global data available to Twigs
  add_filter( 'timber_context', function( $context ) {
		$context['menu'] = new TimberMenu();

		return $context;
	});

  // Javascript loader function
	function load_script( $name, $src, $footer = true ) {
		wp_register_script( $name, $src, array(), false, $footer );
		wp_enqueue_script( $name );
		error_log( $src );
	}
	// Load necessary JavaScripts
	function load_scripts() {
		//load_script( 'modernizr', get_template_directory_uri() . '/assets/javascripts/modernizr-custom.js', false );
		error_log( 'loaded scripts' );
	}
	function load_footer_scripts() {
		//load_script( 'scripts', get_template_directory_uri() . '/assets/javascripts/scripts.js',  1 );
	}
	add_action( 'wp_enqueue_scripts', 'load_scripts' );

  // Helps keep your permalinks in order if doing local development
	update_option( 'siteurl', 'http://'.$_SERVER['HTTP_HOST'] );
	update_option( 'home', 'http://'.$_SERVER['HTTP_HOST'] );

	// Enable the theme to do some important things, like menus.
	add_theme_support( 'menus' );

	// Custom Options Page. Requires ACF Pro
	// if( function_exists('acf_add_options_page') ) {
	// 	acf_add_options_page(array(
	// 		'page_title' 	=> 'GoodPress Options',
	// 		'menu_title'	=> 'Site Info',
	// 		'menu_slug' 	=> 'goodpress-options',
	// 		'capability'	=> 'edit_posts',
	// 		'redirect'		=> false
	// 	));
	// }

	// Custom Title for ACF Posts with Title field hidden
	// function update_acf_title( $post_id ) {
	//     if( empty($_POST['acf']) ) {
	// 			return;
	// 		}
  //
	// 		if ( 'example_post_type' == $_POST['post_type'] ) {
	// 			$array_values = array_values($_POST['acf']);
	// 			$slug = 'set the slug here';
	// 			$title = 'set the title here';
	// 			wp_update_post(
	// 				array (
	// 					'ID'            => $post_id,
	// 					'post_name'    	=> $slug,
	// 					'post_title'    => $title
	// 				));
	//     }
	// 		else {
	// 			return;
	// 		}
	// }
	// add_action( 'acf/save_post', 'update_acf_title', 1 );


	// Router
	// if ( class_exists( 'Timber' ) ) {
	// 	Timber::add_route( 'blog', function( $params ) {
	// 			$page = 0;
	// 			$query = array( 'post_type' => 'post', 'posts_per_page' => 6, 'offset' => $page * 6 );
	// 			Timber::load_template( 'archive.php', $query );
	// 	});
  //
	// 	Timber::add_route( 'blog/page/:pg', function( $params ) {
	// 			$page = $params['pg'];
	// 			$page -= 1;
	// 			$page = max( 0, $page );
	// 			$query = array( 'post_type' => 'post', 'posts_per_page' => 6, 'offset' => $page * 6 );
	// 			Timber::load_template( 'archive.php', $query );
	// 	});
	// }
