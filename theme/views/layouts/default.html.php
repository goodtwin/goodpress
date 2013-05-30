<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class=""> <!--<![endif]-->
<head>
  <?php echo render_partial("layouts/head"); ?>
</head>
<body>
<div class="page-wrapper">

<header class="site-header">
<?php echo render_partial("layouts/header"); ?>
</header>

<section class="site-content">
<?php echo yield(); ?>
</section>

<footer class="site-footer">
<?php echo render_partial("layouts/footer"); ?>
</footer>  

<?php echo javascript_include_tag("lib/requirejs/require"); ?>
<?php echo javascript_include_tag("main"); ?>
<?php 
	if (is_front_page()) {

	} else if (is_home()) {

	} else if (is_page()) {

	} else if (is_single()) {

	} else if (is_archive()) {

	} else {

	} 
?>

</div>
</body>
</html>