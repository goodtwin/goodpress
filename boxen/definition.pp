class projects::goodpressproject {

  php::project { 'goodpressproject' :
    nginx => 'projects/shared/goodpress.conf.erb',
    mysql => true,
    source => 'your source repo',
    php => '5.4.10',
  }
  mysql::user { 'goodpress_dev':
  	password => 'ALLTHETHINGS'
	}
	mysql::user::grant { 'goodpressproject_permissions':
		username => 'goodpress_dev',
  	database => 'goodpress_development'
	}
}
