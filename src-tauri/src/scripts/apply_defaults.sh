#!/bin/bash
#set -e
##################################################################################################################
# Written to be used on 64 bits computers
# Author 	: 	DarkXero
# Website 	: 	http://xerolinux.xyz
##################################################################################################################
tput setaf 1
echo "###############################################################################"
echo "#                         !!! XeroLinux Reset Tool !!!                        #"
echo "#                                                                             #"
echo "#              Having Issues With Messed Up Layout or Settings ?              #"
echo "#                                                                             #"
echo "#            This Will Restore Stock Defaults. Layout WILL BE RESET           #"
echo "###############################################################################"
tput sgr0
echo
echo "Hello $USER, which Edition are you using ?"
echo
echo "1.  XeroLinux KDE Plasma."
echo "2.  XeroLinux GNOME Spin."
echo "3.  XeroLinux XFCE  Spin."
echo
#echo "4.  Exit"
echo
echo "Please Select an Option..."
echo

read CHOICE

case $CHOICE in

    1 )
      echo "Creating Backups of ~/.config folder"
      echo "#####################################"
      cp -Rf ~/.config ~/.config-backup-$(date +%Y.%m.%d-%H.%M.%S)
      rm -Rf ~/.local/share/plasma/
      sleep 2
      echo "###################################"
      echo "  Restoring/Applying KDE defaults  "
      echo "###################################"
      sleep 2
      sudo pacman -Rdd qt5-virtualkeyboard --noconfirm
      sudo pacman -S xero-kde-config xero-catppuccin-sddm lightly-git latte-dock-git asian-fonts lightlyshaders-git catppuccin-cursors-git catppuccin-kde-theme-git xero-catppuccin-wallpapers catppuccin-gtk-theme-mocha tela-circle-icon-theme-dracula-git --noconfirm --needed
      cp -rf /etc/skel/. ~
      sudo sed -i "s/Current=.*/Current=catppuccin/g" /etc/sddm.conf.d/kde_settings.conf
      cd ~ && git clone https://github.com/xerolinux/default-grub.git
      cd ~/default-grub/ && sudo ./install.sh
      rm -rf ~/default-grub
      sleep 2
      echo "##################################"
      echo "  Done! Reboot to Apply Settings  "
      echo "##################################"
      sleep 6

      ;;

    2 )
      echo "Creating Backups of ~/.config folder"
      echo "#####################################"
      cp -Rf ~/.config ~/.config-backup-$(date +%Y.%m.%d-%H.%M.%S)
      sleep 2
      echo "###################################"
      echo "      Restoring Gnome defaults     "
      echo "###################################"
      sleep 2
      sudo pacman -Rcns --noconfirm gnome-software gnome-software-packagekit-plugin
      sudo pacman -S --noconfirm libpamac pamac-gtk pamac-cli pamac-gnome-integration libpamac-flatpak-plugin
      cp -rf /etc/skel/. ~
      rm ~/.config/autostart/dconf-load.desktop
      sh /usr/local/bin/xdconf
      sleep 2
      echo "##################################"
      echo "  Done! Reboot to Apply Settings  "
      echo "##################################"
      sleep 6

      ;;

    3 )
      echo "Creating Backups of ~/.config folder"
      echo "#####################################"
      cp -Rf ~/.config ~/.config-backup-$(date +%Y.%m.%d-%H.%M.%S)
      sleep 2
      echo "###################################"
      echo "      Restoring XFCE defaults      "
      echo "###################################"
      sleep 2
      cp -rf /etc/skel/. ~
      sleep 2
      echo "##################################"
      echo "  Done! Reboot to Apply Settings  "
      echo "##################################"
      sleep 6

      ;;

    * )
      echo "#################################"
      echo "Choose the correct number"
      echo "#################################"
      ;;
esac
