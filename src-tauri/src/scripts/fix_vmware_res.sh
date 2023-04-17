#!/bin/bash
#set -e
##################################################################################################################
# Author 	: 	dedSyn4ps3
# Website 	: 	https://www.nullreturn-it.com
# Github    :   https://github.com/dedSyn4ps3
##################################################################################################################
echo
tput setaf 3
echo "###############################################################################"
echo "#                         XeroLinux ISO Utility Tool                          #"
echo "#                                                                             #"
echo "#                           VMWare Resolution Fix                             #"
echo "#                                                                             #"
echo "###############################################################################"
tput sgr0
echo
echo
echo
tput setaf 3
echo "##########################################"
echo "#    Enabling VMTools, Please Wait...    #"
echo "##########################################"
tput sgr0
echo
sleep 2


systemctl enable --now vmtoolsd


exit