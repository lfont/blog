[Firefox OS](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS) a.k.a 
(B2G) is a mobile operating made by Mozilla. The main concept of the OS is 
based on the fact that applications are developped with Web standards.  
Firefox OS share a lot of components with the Firefox browser. The applications 
are running on top of the same Gecko engine, but Firefox OS uses a custom user 
interface called [Gaia](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Gaia) 
that is more suitable for mobile devices.   
Firefox OS is under active development but it is not ready for the mass market 
yet. It is an Open Source project so we can easily get an early preview of 
the OS by following some simple steps.

How to install Firefox OS on a Galaxy Nexus
-------------------------------------------

The [Build steps](https://developer.mozilla.org/en-US/docs/Mozilla/Boot_to_Gecko/B2G_build_prerequisites) 
of Firefox OS are quite simple. The team behind the project has decided to 
support some existing devices has build target.     
The support of these devices are not at the same level of reliability. Indeed 
the Galaxy Nexus has a level of 3. That means that is possible to install the 
system on this device, but you are alone if you find bugs or if it lacks some 
features.   
By following the steps below I have been able to build the OS on Ubuntu 12.10 
and get it runs on my Galaxy Nexus. If you decide to give it a try, keep in 
mind that Firefox OS is not ready to be used as you day-to-day mobile OS.

### Set the udev rules

Firefox OS use the same tools for managing the device that Android uses. We need
to add some udev rules to have access to the device througt `adb`.

    # /etc/udev/rules.d/51.-android.rules
    SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", ATTRS{idProduct}=="685c", MODE="0666", GROUP="plugdev" #Normal Galaxy Nexus
    SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", ATTRS{idProduct}=="6860", MODE="0666", GROUP="plugdev" #Debug Galaxy Nexus
    SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", ATTRS{idProduct}=="4e30", MODE="0666", GROUP="plugdev" #Fastboot Galaxy Nexus

Then we must restart the udev service:

    $ service udev restart

### Backup the device

There are a lot of chance that you want to reinstall the stock Android system, 
so a backup of the device can be usefull. Before running the `adb` command check
if your device is in the USB debug mode.

    $ adb backup -apk -noshared -all -nosystem -f ./20120916.ab

The `adb backup` does not backup your SMS if you want to preserve them you shoud
use an app like [SMSBackupAndResote](https://play.google.com/store/apps/details?id=com.riteshsahu.SMSBackupRestore&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5yaXRlc2hzYWh1LlNNU0JhY2t1cFJlc3RvcmUiXQ..).

### Install the required packages

For building the Firefox OS source code you must install the following packages:

    $ sudo apt-get install \
        autoconf2.13 \
        git \
        ccache \
        gcc \
        g++ \
        gcc-4.6 \
        g++-4.6 \
        g++-4.6-multilib \
        bison \
        flex \
        lib32ncurses5-dev \
        ia32-libs \
        lib32z1-dev \
        make \
        curl \
        zip \
        openjdk-6-jdk

### Clone the B2G repository

Just grab the source from the GitHub repository:

    git clone https://github.com/mozilla-b2g/B2G.git

### Configure the B2G build system

Now, we have to configure the build to target our Galaxy Nexus device:

    ./config.sh galaxy-nexus

### Fix the key mapping

For instance, Firefox OS does not play well with devices that does not have 
physical keys. The ergonomy is based on the fact that a "home" button exists.   
One quick and dirty solution is to remap the volume up key to behave like a 
"home" button. A better, solution is probably to add a virtual button bar to 
Gaia, like the virtual button bar of Android, but this is out of scope of this
article.

    # B2G/device/samsung/tuna/tuna-gpio-keypad.kl
    key 114   VOLUME_DOWN       WAKE
    key 115   HOME              WAKE
    key 116   POWER             WAKE

### Build B2G

Ubuntu 12.10 make use of GCC 4.7, but the source does not compile with this 
version of GCC because some constructs are not supported anymore. We can use 
[`update-alternatives`](http://linux.die.net/man/8/update-alternatives) to
temporaly switch back to GCC 4.6.

First, we have to register the two version of GCC:

    $ update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.7 100
    $ update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.6 50

    $ update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.7 100
    $ update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 50

    $ update-alternatives --install /usr/bin/cpp cpp-bin /usr/bin/cpp-4.7 100
    $ update-alternatives --install /usr/bin/cpp cpp-bin /usr/bin/cpp-4.6 50

Then, we can set the version of GCC to 4.6:

    $ update-alternatives --set g++ /usr/bin/g++-4.6
    $ update-alternatives --set gcc /usr/bin/gcc-4.6
    $ update-alternatives --set cpp-bin /usr/bin/cpp-4.6

Let's build the code:

    $ ./build.sh

After the build, we can restore the default version of GCC by executing the 
following commands:

    $ update-alternatives --auto g++
    $ update-alternatives --auto gcc
    $ update-alternatives --auto cpp-bin

### Flash the system

The `flash` script manage all the steps neccessary to flash the OS to the 
device. Unlocking the bootloader of the device is one of these steps.   
If your device has a locked bootloader it will be unlocked. Take care that 
unlocking the bootloader will wipe all data of your device, including the the 
content of `/mnt/sdcard`!

    $ ./flash

You should now have Firefox OS up and running on your Galaxy Nexus! 
Happy testing.

### Switch back to Android

To reinstall Android on your device you can use one of the
[factory images](https://developers.google.com/android/nexus/images#mysid).
By running the following sript your device will be completly restored.

    $ ./flash-all.sh

Then restore the backup made by `adb`. Do not forget to re-enable the USB debug
mode:

    $ adb restore ./20120916.ab
