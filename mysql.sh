#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Automated script to allow remote access to local mysql instance
#
pass=$(awk '/root_password/ { print $2 }' /etc/openproject/installer.dat)
mysql --user=root --password=$pass -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;"
