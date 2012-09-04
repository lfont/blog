Actually, I'm using [Git](http://git-scm.com) on a Windows desktop at work and I like the default prompt that comes with the Git Bash terminal.   
I decided to set the same configuration on my Ubuntu laptop.

Displaying the current branch name on the prompt
------------------------------------------------

This feature can easily been added by sourcing the [git-prompt.sh](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh) script and adding the value returned by the __get_ps1() function to the PS1 variable.   

    # ~/.bashrc file
    source ~/.git-prompt.sh
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w$(__git_ps1 " (%s)")
    $ '

If like me you like to have all these shinny colors in your terminal:   

    # ~/.bashrc file
    # Uncomment the following line
    force_color_prompt=yes

    # Set the colored PS1
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$(__git_ps1 " (%s)")
    $ '

Note the like break before the "$", when the prompt is very long I like not having my command on more than one line. Feel free to remove it if you don't like it.