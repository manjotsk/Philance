#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Script to set openpaas.local at Windows hosts file level
#
paath=$(find /home/Philance -name "hosts")
grep -E '^127.0.0.1 openpaas.local davserver.openpaas.local james.openpaas.local$' $paath > /dev/null
if [[ "$?" == "1" ]]
then
	echo "127.0.0.1 openpaas.local davserver.openpaas.local james.openpaas.local" >> $paath
fi
grep -E '^127.0.0.1 Philance.local$' $paath > /dev/null
if [[ "$?" == "1" ]]
then
	echo "127.0.0.1 Philance.local" >> $paath
fi
