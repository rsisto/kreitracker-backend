#!/bin/bash
echo "start telnet"
echo "I am traveling from China to Jerusalem and back in 15 seconds"
cd auxs
for i in $(seq 1 1 200000)
do
sh I_am_in_China.sh
sleep 5
sh I_am_in_China.sh
sleep 5
sh I_am_in_China.sh
sleep 5

echo "Going to Jerusalem"

sh  I_am_in_Jerusalem.sh
sleep 5
sh  I_am_in_Jerusalem.sh
sleep 5
sh  I_am_in_Jerusalem.sh
sleep 5
echo "Going to China"
done

