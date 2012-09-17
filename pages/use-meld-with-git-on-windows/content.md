[Meld](http://meldmerge.org/) is a very nice diff and merge tool written in 
Python that works on Linux, Mac OS and Windows. There is a lot of diff and merge 
tools out there, but Meld is every efficient for showing the difference between 
files.
Here are [some screenshots](http://rvb.mytanet.de/comparing-latex-files-with-latexdiff.shtml) 
that show the output of differents tools.   
Setting up [Git](http://git-scm.com/) to use an alternative diff and merge 
tool is very easy but there is a special behavior on Windows.


How to run Meld on Windows
--------------------------

The first thing to do is to install all 
[the requirement](https://live.gnome.org/Meld/Windows). Even if the page 
recommends Python 2.6 and Meld 1.5.0, I had no issue to run Meld 1.6 on 
top of Python 2.7.   
As the page indicates it, it is recommanded to check PyGtkSourceView in the 
PyGTK All-in-one installer to have useful features like line numbering and syntax 
coloration.  
On a Unix system one can run a graphical python application just by running the 
Python script from the console or by clicking on it, but on Windows it is a bit 
different. There are two solutions:

1. Renaming the Meld script `bin/meld` to `bin/meld.pyw`. That tells Windows to 
run the program as a GUI application, this is very handy because it will not 
launch a command prompt (This is the case when the extension is .py).
2. Creating a link from `bin/meld` and then edit the target 
(Right Click / Properties) and prepend "C:\Python27\pythonw.exe" to the path of 
the Meld script.

    C:\Python27\pythonw.exe C:\meld-1.6.0\bin\meld

`pythonw.exe` should be used when you run a GUI application. It avoids a 
command prompt from being displayed.   
Once these steps have been done, you can run Meld like any standard Windows 
application.


Configure Git to use Meld
-------------------------

When you run `git difftool -g` for the first time (or with `--prompt` to 
override the configuration), the command lists all the tools that are supported. 
A supported tool can be configured with:

    # set up the default gui diff tool
    $ git config --global diff.guitool <tool name>

When the `diff.guitool` or `diff.tool` is defined with the name of a supported 
tool it is only possible to define the path to the tool and not a custom 
command. If you try to define a custom command with a supported tool like Meld 
(`difftool.meld.cmd`) you will get this kind of error:

    C:\Program Files (x86)\Git/libexec/git-core/mergetools/meld: line 2: meld: command not found

This can be confusing because on Windows, Meld is not listed as a supported 
tool even if it actually is. So on Windows, like on Ubuntu, you only 
have to set the Meld path. On Windows it consists in:

    # set up Meld as the default gui diff tool
    $ git config --global  diff.guitool meld

    # set the path to Meld
    $ git config --global difftool.meld.path C:/meld-1.6.0/Bin/meld.sh

The `meld.sh` is a shell script used to launch Meld. This is needed because on 
Windows there is no equivalent for the 
[shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29). The content of this 
script is:

    #!/bin/env bash
    C:/Python27/pythonw.exe C:/meld-1.6.0/bin/meld $@

Now, you can run

    $ git difftool -g

inside any git repository to compare files with Meld.   

To remove the confirmation before each difftool invocation, use:

    # disable the promt before each invocation
    $ git config --global difftool.prompt false


### Meld as a merge tool

The same simple steps can be reproduced to configure the merge tool:

    # set up Meld as the default merge tool
    $ git config --global  merge.tool meld

    # set the path to Meld
    $ git config --global mergetool.meld.path C:/meld-1.6.0/Bin/meld.sh    

    # disable the promt before each invocation
    $ git config --global mergetool.prompt false
