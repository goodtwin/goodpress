<?php

/**
 * Wordless holds all the plugin setup and initialization.
 */
class Wordless {

  private static $preferences = array();
  private static $helpers = array();

  public static function initialize() {
    self::require_helpers();
    self::require_theme_initializers();
  }

  public static function helper($class_name) {
    if (!isset(self::$helpers[$class_name])) {
      self::$helpers[$class_name] = new $class_name();
    }
    return self::$helpers[$class_name];
  }

  public static function register_helper($class_name) {
    foreach (get_class_methods($class_name) as $method) {
      if (!function_exists($method)) {
        $global_function_definition = "function $method() { \$helper = Wordless::helper('$class_name'); \$args = func_get_args(); return call_user_func_array(array(\$helper, '$method'), \$args); }";
        eval($global_function_definition);
      }
    }
  }

  /**
   * Set a Wordless preference
   */
  public static function set_preference($name, $value) {
    self::$preferences[$name] = $value;
  }

  /**
   * Get a Wordless preference
   */
  public static function preference($name, $default = '') {
    return isset(self::$preferences[$name]) ? self::$preferences[$name] : $default;
  }

  public static function require_helpers() {
    $helpers_path = self::theme_helpers_path();
    self::require_once_dir($helpers_path);
  }

  public static function require_theme_initializers() {
    $initializers_path = self::theme_initializers_path();
    self::require_once_dir($initializers_path);
  }

  /**
   * Require one directory
   * @param string $path
   */
  public static function require_once_dir($path) {
    $list_files = glob(Wordless::join_paths($path, "*.php"));
    if (is_array($list_files)) {
        foreach ($list_files as $filename) {
          require_once $filename;
        }
    }
  }

  public static function theme_helpers_path() {
    return self::join_paths(get_template_directory(), 'config/helpers');
  }

  public static function theme_initializers_path() {
    return self::join_paths(get_template_directory(), 'config/initializers');
  }

  public static function theme_views_path() {
    return self::join_paths(get_template_directory(), 'views');
  }

  public static function theme_url() {
    return parse_url(get_bloginfo('template_url'), PHP_URL_PATH);
  }

  public static function join_paths() {
    $args = func_get_args();
    $paths = array();

    foreach($args as $arg) {
      $paths = array_merge($paths, (array)$arg);
    }

    foreach($paths as &$path) {
      $path = trim($path, '/');
    }

    if (substr($args[0], 0, 1) == '/') {
      $paths[0] = '/' . $paths[0];
    }

    return join('/', $paths);
  }

}
Wordless::initialize();