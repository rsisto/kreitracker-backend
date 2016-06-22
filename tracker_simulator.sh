#!/bin/bash
echo "start telnet"
telnet localhost 1337 <<EOF
##,imei:359710047037420,A;
imei:359710047037420,tracker,0809231929,13554900601,F,112909.397,A,2234.4669,N,11354.3287,E,0.11,;  
EOF 
sleep 3	


