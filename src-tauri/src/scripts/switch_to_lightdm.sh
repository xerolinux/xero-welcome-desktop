#!/bin/bash
#set -e
##################################################################################################################
# Written to be used on 64 bits computers
# Author 	: 	DarkXero
# Website 	: 	http://xerolinux.xyz
##################################################################################################################
echo
echo "Removing SDDM & its Dependencies"
echo "################################"
sudo pacman -Rdd --noconfirm sddm sddm-kcm

echo
sleep 2
echo "Installing & Enabling LightDM"
echo "#############################"

sudo pacman -S --needed --noconfirm lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings
sleep 2

sudo rm /etc/lightdm/lightdm-gtk-greeter.conf
cd /etc/lightdm/ && sudo wget https://raw.githubusercontent.com/xerolinux/xero_iso/main/Xero/airootfs/etc/lightdm/lightdm-gtk-greeter.conf
sudo systemctl enable lightdm.service -f

echo "#################################"
echo "LightDM is now active - rebooting"
echo "#################################"
sleep 6
reboot
