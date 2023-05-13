# Maintainer: Ed Rutherford <erutherford@nullsecurity.tech>
pkgname=xerowelcome-desktop
_pkgname=xero-welcome-desktop
pkgver=2.3.5
pkgrel=1
pkgdesc="Xerolinux System Utility"
arch=('x86_64')
url="https://github.com/xerolinux/xero-welcome-desktop"
license=('GPL')
depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme' 'pango' 'webkit2gtk')
makedepends=(
    "npm"
    "nodejs-lts-gallium"
    "rustup"
    "git"
    "webkit2gtk"
    "base-devel"
    "curl"
    "wget"
    "openssl"
    "appmenu-gtk-module"
    "gtk3"
    "libappindicator-gtk3"
    "librsvg"
    "libvips"
)
provides=("xerowelcome-desktop")
conflicts=("xerowelcome-desktop")
replaces=('xerolinux-tool' 'xerolinux-tool-dev' 'xero-g-hello' 'xerowelcome')
source=("$pkgname::git+https://github.com/xerolinux/xero-welcome-desktop.git")
sha256sums=("SKIP")

build() {
    PURPLE=$(tput setaf 201)
    WHITE=$(tput setaf 255)
    END="\e[0m"
    
    cd "$pkgname"

    echo
    echo -e "${PURPLE}|============================|${END}"
    echo -e "${WHITE}   Installing Rust Nightly     ${END}"
    echo -e "${PURPLE}|============================|${END}"

    rustup toolchain install nightly
    rustup default nightly

    echo
    echo -e "${PURPLE}|=============================|${END}"
    echo -e "${WHITE}   Gathering UI Dependencies     ${END}"
    echo -e "${PURPLE}|=============================|${END}"

    npm install

    echo
    echo -e "${PURPLE}|=============================|${END}"
    echo -e "${WHITE}     Compiling Application     ${END}"
    echo -e "${PURPLE}|=============================|${END}"

    npm run tauri build
}

package() {
    PURPLE=$(tput setaf 201)
    WHITE=$(tput setaf 255)
    END="\e[0m"

    cd "${pkgname}/src-tauri/target/release/bundle/deb/${pkgname}_${pkgver}_amd64/data"

    for size in 128x128 256x256@2 512x512; do
        install -Dm644 "usr/share/icons/hicolor/${size}/apps/${pkgname}.png" "${pkgdir}/usr/share/icons/hicolor/${size}/apps/${pkgname}.png"
    done

    install -Dm755 "usr/bin/${pkgname}" "${pkgdir}/usr/bin/${pkgname}"

    install -Dm644 "usr/share/applications/${pkgname}.desktop" "${pkgdir}/usr/share/applications/${pkgname}.desktop"
    install -Dvm644 "usr/share/applications/${pkgname}.desktop" "${pkgdir}/etc/skel/.config/autostart/${pkgname}.desktop"
    install -Dvm644 "usr/share/applications/${pkgname}.desktop" "${pkgdir}/home/$USER/.config/autostart/${pkgname}.desktop"

    cd "usr/share/scripts"
    for script in *; do
        install -Dm755 "${script}" "${pkgdir}/usr/share/${pkgname}/scripts/${script}"
    done

    echo
    echo -e "${PURPLE}|=============================|${END}"
    echo -e "${WHITE}     Packaging Complete     ${END}"
    echo -e "${PURPLE}|=============================|${END}"
    echo
}
