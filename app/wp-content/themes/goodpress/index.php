<?php

/*
 * In this page, you need to setup Wordless routing: you first
 * determine the type of the page using WordPress conditional tags,
 * and then delegate the rendering to some particular view using
 * the `render_view()` helper.
 *
 * To specify a layout other than the default one, please pass it as
 * the second parameter to the `render_view()` method.
 *
 * For a list of conditional tags, please see here: http://codex.wordpress.org/Conditional_Tags
 */

if (is_front_page() || is_page('Landing')) {
	render_view('pages/landing');
}
else if (is_page('Gallery')) {
    render_view('pages/gallery');
}
else if (is_page('For Kids')) {
	render_view('pages/forkids');
}
