<?php header("HTTP/1.1 404 File not found"); ?>
<h2>Page not found - error 404</h2>
<h4>
<strong>
  Sorry. The page
  <?php echo $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]; ?>
  was moved or doesn't exist
</strong>
</h4>