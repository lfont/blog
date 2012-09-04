I'm using [Git](http://git-scm.com) at work on a Windows desktop and I like the default prompt that came with the Git Bash terminal.   
So I decided to set the same configuration on my Ubuntu laptop.

Displaying the current branch name on the prompt
------------------------------------------------

This feature can easily been added by sourcing the [git-completion.bash](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash) script and setting the PS1 variable with value returned by the __get_ps1() function.   

    # ~/.bashrc file
    . $HOME/.local/share/git/git-completion.bash
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$(__git_ps1)$ '

If like me you like to have all these shinny colors in your terminal:   

   # ~/.bashrc file
   # Uncomment the line
   force_color_prompt=yes

   # Set the colored PS1
   PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\[\033[33m$(__git_ps1)\033[0m\]
$ '

I also like the line-break before the $ so I kept the 0m\ at the end.