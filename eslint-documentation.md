ESLint Documentation for Potencia Codebase

Hi all! I’ve been in London this semester and am excited to be part of the team in person in the Spring. 
In the meanwhile, I’ve been working a bit on the backend. Hope it helps y’all!

How ESLint Works
------------------------
As you all know, for our codebase, we’ll be using a linter. For those not familiar, 
a linter is a program that takes a code file (.ts, .cpp, etc) as an input
and highlights formatting, functions, syntax, and style (unintentional alliteration
while writing this)that go against its programming. 
Basically it’s a style checker that also catches syntax errors and use of unsafe 
functions, among many other great features. Many linters are used as VSCode plugins 
and will give you red squiggles when you type something they don’t like. 

Ellis has asked me to set up the codebase such that it will run our linter of choice,
eslint, as a Github action on pushing code. Translated, this means that whenever
anyone pushes a .ts or .js file to the Potencia repository, Github will copy it into
a temporary virtual machine and run the linter on the code within that space. 
If it likes it, you’ll get a green checkmark; otherwise there’ll be a red X and 
you can examine what went wrong in the “Actions” tab on the Github page. 

Because this virtual machine’s creation and use is slow, it can take 30s or more
for the full check to run. Because of this, the loop of:
1. push, wait 30 seconds
2. get errors
3. fix them, push again, wait 30 seconds
4. find more resulting errors, repeat

is very slow. As such, it’s much faster to run eslint directly on your machine
and do the debugging/style-fixing locally to make sure your push succeeds on the
first try. 

How You Can Use it (More Efficiently)
---------------------------------------

As such, we need to get eslint! Just run “npm install eslint” to download.  Here’s the install guide if you need it or want to read further:
https://eslint.org/docs/latest/user-guide/getting-started


And the command is just:

“npx eslint {file.ts}”

You can even run it on multiple files at once! Just put all of them after “npx eslint”
on the command line. Once clean, your files can be successfully pushed to the repository.


So, to cover all-- 
Our workflow should look something like this:
  1. Write some code on our machines
  2. Run “npx eslint {mycode.ts}”
  3. Fix any flagged errors
  4. Push to the Potencia branch you’re on
  
(As a tip, you can eliminate the manual run by installing the VSCode Eslint extension!
 This will give you live error reporting and is much quicker to use if VSCode is your
 editor of choice. I’m sure there’s a vim plugin too. ed probably has one written by
 Norman Ramsey.)
 
Hope this helps! Please let me know if you have any questions; feel free to PM on Slack.

Cheers,
R
