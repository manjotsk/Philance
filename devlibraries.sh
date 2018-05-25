#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Libraries to install on startup
#
#	It is vital that this is kept up to date as the same script will run on #	test server each time a build is initiated.
#
#	If any libraries are built on machines please update this file also
#
cd /opt/openproject/public/philance-app
npm install -g express --save
cd /tmp;wget https://dev.mysql.com/get/Downloads/Connector-Nodejs/mysql-connector-nodejs-8.0.11.tar.gz
cd /opt/openproject/public/philance-app;sudo npm install -g /tmp/mysql-connector-nodejs-8.0.11.tar.gz
