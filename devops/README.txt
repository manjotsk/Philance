This directory is for devops/system deployment related information


The /etc/httpd/conf/httpd.conf file will need to be replaced in order to execute Python scripts
The /etc/httpd/conf.d/openproject.conf file will need replacing to allow the Philance code directory
within /opt/openproject to by pass the proxy (i.e. the ruby server process)

The hostch script is a custom script sitting in /usr/local/Philance. This is only
needed for dev environment builds and won't be needed on test/prod/show and tell
environments
