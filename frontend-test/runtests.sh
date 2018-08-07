#!/bin/bash
export PATH=$PATH:/home
export DISPLAY=:1
if [[ "$1" == "" ]]
then
	nosetests *.py --with-html --html-report=test.html
else
	nosetests $1 --with-html --html-report=test.html
fi
