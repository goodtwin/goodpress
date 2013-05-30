<!--Charset  -->
<meta content="text/html;charset=UTF-8" http-equiv="Content-type" />

<!--Title  -->
<title><?php echo wp_title(); ?></title>

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!--Stylesheets  --> 

<?php echo stylesheet_link_tag("application"); ?>
<?php 
	if (is_front_page()) {

	} else if (is_home()) {

	} else if (is_page()) {

	} else if (is_single()) {

	} else if (is_archive()) {

	}
?>

<!--HTML5 Shiv  -->
<!--[if lt IE 9]>
<?php echo javascript_include_tag("http://html5shiv.googlecode.com/svn/trunk/html5.js"); ?>
<![endif]-->

<?php wp_head(); ?>