<h2>Archive</h2>
<ul>
<?php while (have_posts()) { ?>

<?php the_post(); ?>

<li>
<?php echo render_partial("posts/post"); ?>
</li>

<?php } ?>
</ul>