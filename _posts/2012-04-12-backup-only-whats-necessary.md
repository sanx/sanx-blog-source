---
layout: post
title: Backup only what's necessary
---

When backing up a home directory, you don't want to backup subversion checkout subdirectories that have no changes relative to their repositories (i.e. subversion directories with no local changes).

I made a script which will help you find directories corresponding to svn checkouts that are up-to date relative to their repositories. I saved it as `~/bin/get_up_to_date_svn_dirs.pl`:

    #!/usr/bin/perl -w
    
    my @input_list = ();
    my @clean_paths = ();
    my @clean_parents = ();
    while(<>) { 
        push @input_list, $_;
    }
    
    my $cmp_path = "cmp_path";
    
    # sorts alphabetically/lexicographically based on the "path" component of the input line.
    @input_list = @clean_parents = sort cmp_path @input_list;
    
    for my $line(@input_list) {
        $line =~ m/^\s*(\d+)\s*(.*)\s*$/;
        my $path = $2;
        my $svn_info_out = `cd $path; svn info > /dev/null 2>/dev/null; echo \$?;`;
        chomp $svn_info_out;
        if($svn_info_out eq "1") {
            next;
        }
        my $svn_status_out = `cd $path; svn status`;
        chomp $svn_status_out;
        if($svn_status_out eq "") {
            if(scalar(@clean_paths) != 0) {
                my $prev_clean_path = $clean_paths[scalar(@clean_paths) - 1];
                if($path =~ m/^.*$prev_clean_path.*$/) {
                    next;
                }
            }
            push @clean_paths, $path;
            print "$path\n";
        }
    }
    
    # comparison function takes 2 lines having the following format:
    # 1024    /tmp/a/file.txt
    # and returns the result of alphabetically comparing the second part of the line
    # (e.g. /tmp/a/file.txt)
    sub cmp_path {
        $a =~ m/^\s*(\d+)\s*(.*)\s*$/;
        my $path_a = $2;
        $b =~ m/^\s*(\d+)\s*(.*)\s*$/;
        my $path_b = $2;
        return $path_a cmp $path_b;
    }


First, I run `du`, and `sort` it numerically to get an idea of how big the home directory that I want to back up is, and save the output to file `user-du.txt` under my own home directory:

    du ~user/ | sort -n | tee ~/user-du.txt

Now, I'll feed this `du` output to my script, which will generate a list of paths in the input file that correspond to svn checkout directories that are up to date relative to their repositories. I save this list in file `~/tmp/user-all-clean.txt`:

    cat ~/user-du.txt | ~/bin/get_up_to_date_svn_dirs.pl | tee ~/tmp/user-all-clean.txt

At this point, I know:

*   the base directory that I want to back up (e.g. the home directory of a user that I want to back up, like `~user/`).
*   a list of paths that it's not necessary to back up because they're subversion checkouts with no local changes.

I can use `tar`, using the `--exclude-from` option to finally backup what I want in gzipped tarball file `~/user-home.tgz`

    tar --exclude-from ~/tmp/user-all-clean.txt -zcvf ~/user-home.tgz ~user/

@TODO (exercise for the reader): Have `~/bin/get_up_to_date_svn_dirs.pl` output the svn _repository paths_ and _revision numbers_ that we're skipping to get the full information that would allow us to restore the backup precisely by restoring not only the tarball but also checking out the right _paths_ and _revisions_ from subversion.
