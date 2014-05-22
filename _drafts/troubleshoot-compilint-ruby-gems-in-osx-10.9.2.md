The issues you are facing are specific to **OSX Mavericks** and the latest version(s) of XCode *(as of today, May/21/2014)*. I'm also on 10.9.2, and I faced the following issues, which are what you're facing too, I believe.

Here are the issues I faced while trying to install/build **Ruby gems** that involve compiling native code and/or some dependencies that do:

*   You get something like `Could not create Makefile due to some reason, probably lack of necessary libraries and/or headers.` somewhere in your output.

    **Reason:** the ubiquitus **Command Line Tools** are not installed on your system.

    **Solution:** There are 3 ways to install the **Command Line Tools**: **1)** installing the full XCode suite, starting it, and letting it install the **Command Line Tools** for you, **2)** running `xcode-select --install`, which will pop up a dialog asking you if you want to *install the full XCode*, *install only the Command Line Tools*, or *Cancel*. This second approach is what I did and it worked for me once, but I've seen it fail on other machines, since apparently the location where it looks for the package online is sometimes accessible, sometimes not, so try this if you want, but it may not work, and, finally **3)** downloading it from the web at the [**Apple Developer Tools**][1] page *(login with Apple account required)*

*   You get something like `clang: error: unknown argument: '-multiply_definedsuppress' [-Wunused-command-line-argument-hard-error-in-future]` somewhere in your output.

    **Reason:** Recent versions of **XCode** removed support for unused command line arguments, as the [XCode 5.1 release notes mention][2]:

    > Compiler

    > As of Apple LLVM compiler version 5.1 (clang-502) and later, the optimization level -O4 no longer implies link time optimization (LTO). In order to build with LTO explicitly use the -flto option in addition to the optimization level flag. (15633276)

    > The Apple LLVM compiler in Xcode 5.1 treats unrecognized command-line options as errors. This issue has been seen when building both Python native extensions and Ruby Gems, where some invalid compiler options are currently specified.

    > Projects using invalid compiler options will need to be changed to remove those options. To help ease that transition, the compiler will temporarily accept an option to downgrade the error to a warning:

    > -Wno-error=unused-command-line-argument-hard-error-in-future

    > Note: This option will not be supported in the future.

    > To workaround this issue, set the ARCHFLAGS environment variable to downgrade the error to a warning. For example, you can install a Python native extension with:

    > $ ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future easy_install ExtensionName

    > Similarly, you can install a Ruby Gem with:

    > $ ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future gem install GemName (16214764)

    **Solution:** the solution is mentioned on the snippet from the XCode release notes above, and basically implies setting environment variable `ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future` before running the `gem` install, like this:

        export ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future
        gem install <your-desired-gem>

    ... or, if you need to execute it as `sudo`, put the above 2 lines in a script and execute it as `sudo`, or run it as `sudo` inline like this:

        sudo bash -c "export ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future; gem install <your-desired-gem>;";

    **Note:** the solution above (setting the `ARCHFLAGS` environment variable) is going to stop working at some point in the future, as indicated in the aforementioned [release notes][2]. Hopefully, by that time current **Ruby gems** will have removed unused command line options from their `Makefile`s.


**NB:** I used the approach outlined above to successfully install the `github-pages` **Ruby gem** in **OSX** 10.9.2


  [1]: https://developer.apple.com/downloads/index.action
  [2]: https://developer.apple.com/library/mac/releasenotes/DeveloperTools/RN-Xcode/Introduction/Introduction.html
