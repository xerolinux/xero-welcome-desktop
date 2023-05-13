#!/bin/bash
#set -e
##################################################################################################################
# Written to be used on 64 bits computers
# Author 	: 	DarkXero
# Website 	: 	http://xerolinux.xyz
##################################################################################################################
echo
tput setaf 3
echo "###############################################################################"
echo "#                            XeroLinux ISO Builder                            #"
echo "###############################################################################"
tput sgr0
echo
echo "Hello $USER, which Edition do you want to build today ?"
echo
echo "########## Edition Selection ##########"
echo
echo "1.  XeroLinux KDE Plasma."
echo "2.  XeroLinux GNOME Spin."
echo "3.  XeroLinux XFCE  Spin."
echo
echo "Type Your Selection. To Exit, just close Window."
echo

while :; do

read CHOICE

case $CHOICE in

    1 )
      echo
      echo "###########################################"
      echo "      Building XeroLinux KDE Flagship      "
      echo "###########################################"
			sleep 3
			cd ~ && git clone https://github.com/xerolinux/xero_iso.git
			sleep 1.5
      echo
      echo "###############################################################################"
      echo "#                             Follow The Prompts                              #"
      echo "#                                                                             #"
      echo "#     Answer with (y) or (n) when asked to keep/remove build/source dirs.     #"
      echo "#           And (n) for profile settings as this is intended for me           #"
      echo "#             Finally just input the date you are building ISO on             #"
      echo "###############################################################################"
      sleep 6
			cd ~/xero_iso/ && abs -x
			sleep 1.5
      echo "###########################################"
      echo "      Done ! Check Home Folder for ISO     "
      echo "###########################################"
      sleep 6
      ;;

    2 )
      echo
      echo "###########################################"
      echo "      Building XeroLinux Gnome Spin      "
      echo "###########################################"
			sleep 3
			cd ~ && git clone https://github.com/xerolinux/xero_g_iso.git
			sleep 1.5
      echo
      echo "###############################################################################"
      echo "#                             Follow The Prompts                              #"
      echo "#                                                                             #"
      echo "#     Answer with (y) or (n) when asked to keep/remove build/source dirs.     #"
      echo "#           And (n) for profile settings as this is intended for me           #"
      echo "#             Finally just input the date you are building ISO on             #"
      echo "###############################################################################"
      sleep 6
			cd ~/xero_iso/ && abs -xg
			sleep 1.5
      echo "###########################################"
      echo "      Done ! Check Home Folder for ISO     "
      echo "###########################################"
      sleep 6
      ;;

    3 )
      echo
      echo "###########################################"
      echo "      Building XeroLinux XFCE Spin      "
      echo "###########################################"
			sleep 3
			cd ~ && git clone https://github.com/XeroLinuxDev/xero_xfce_iso.git
			sleep 1.5
      echo
      echo "###############################################################################"
      echo "#                             Follow The Prompts                              #"
      echo "#                                                                             #"
      echo "#     Answer with (y) or (n) when asked to keep/remove build/source dirs.     #"
      echo "#           And (n) for profile settings as this is intended for me           #"
      echo "#             Finally just input the date you are building ISO on             #"
      echo "###############################################################################"
      sleep 6
			cd ~/xero_iso/ && abs -xf
			sleep 1.5
      echo "###########################################"
      echo "      Done ! Check Home Folder for ISO     "
      echo "###########################################"
      sleep 6
      ;;

    * )
      echo "#################################"
      echo "    Choose the correct number    "
      echo "#################################"
      ;;
esac
done
