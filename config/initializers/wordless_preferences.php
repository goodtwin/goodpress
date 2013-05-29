<?php

/*
 * Configure Wordless preferences here.
 */

Wordless::set_preference("assets.preprocessors", array("JSPreprocessor", "CSSPreprocessor"));
Wordless::set_preference("assets.cache_enabled", false);
// Wordless::set_preference("assets.version", get_theme_version());

Wordless::set_preference("css.compass_path",     "/usr/bin/ruby");
Wordless::set_preference("css.yui_compress",      false);
Wordless::set_preference("css.yui_munge",      false);

// Wordless::set_preference("css.lessc_path",       "/usr/bin/lessc");
// Wordless::set_preference("css.compress",         false);

Wordless::set_preference("js.ruby_path",         "/usr/bin/ruby");
Wordless::set_preference("js.yui_compress",      false);
Wordless::set_preference("js.yui_munge",         false);
