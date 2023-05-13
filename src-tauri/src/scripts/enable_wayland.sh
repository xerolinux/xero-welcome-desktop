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
echo "#                         XeroLinux Wayland Enabler                           #"
echo "#                                                                             #"
echo "#                            !!!! ATTENTION !!!                               #"
echo "#                                                                             #"
echo "#             This Will Allow You To Enable Wayland On Your System            #"
echo "# Be careful though, if you are on nVidia GPU, this might end up not working. #"
echo "#                                                                             #"
echo "#     Enable it AT YOUR OWN RISK ! I will NOT provide any support for it.     #"
echo "###############################################################################"
tput sgr0
echo
echo "Hello $USER, which Edition are you using ?"
echo
echo "########## Edition Selection ##########"
echo
echo "1.  XeroLinux KDE Plasma."
echo "2.  XeroLinux GNOME (XeroG)."
echo
echo "Type Your Selection. To Exit, just close Window."
echo

while :; do

read CHOICE

case $CHOICE in

    1 )
      echo
      echo "###########################################"
      echo "    Adding/Enabling KDE Wayland Support    "
      echo "###########################################"
			sleep 3
			sudo pacman -Rdd --noconfirm sddm
			sudo pacman -S --noconfirm --needed sddm-git xorg-xwayland kwayland-integration plasma-wayland-session plasma-wayland-protocols qt6-wayland
			sleep 3
      echo "###########################################"
      echo "  Please Reboot & Select Wayland on Login  "
      echo "###########################################"

      ;;

    2 )
      echo
      echo "###########################################"
      echo "   Adding/Enabling GNOME Wayland Support   "
      echo "###########################################"
			sleep 3
			sudo sed -i 's|false|true|g' /etc/gdm/custom.conf
			sleep 3
      echo "###########################################"
      echo "  Please Reboot & Select Wayland on Login  "
      echo "###########################################"

      ;;

    * )
      echo "#################################"
      echo "    Choose the correct number    "
      echo "#################################"
      ;;
esac
done
