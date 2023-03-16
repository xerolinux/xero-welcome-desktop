#!/usr/bin/bash
#set -e

echo "#####################################"
echo "       XeroLinux Snapper Setup       "
echo "#####################################"
sleep 5
echo "Step 1 - Creating Root Configuration"
echo "#####################################"
sudo snapper -c root create-config /
sleep 5
echo "Step 2 - Creating Home Configuration"
echo "#####################################"
sudo snapper -c home create-config /home
sleep 5
echo "#####################################"
echo "    Done! System Will now reboot.    "
echo "   You Can Now use BTRFS-Assistant   "
echo "#####################################"
sleep 20
reboot
