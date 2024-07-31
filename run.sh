#/bin/bash
#Remove dist folder
rm -rf dist
clear
clear
#Clean of code
yarn
#Remove unused file
rm -rf *.csv
rm -rf *.lock*
rm -rf *-lock*
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:3001)
#Verifico 
# Detect the platform (similar to $OSTYPE)
OS="`uname`"
case $OS in
  'Linux')
    OS='Linux'
    alias ls='ls --color=auto'
    ;;
  'FreeBSD')
    OS='FreeBSD'
    alias ls='ls -G'
    ;;
  'WindowsNT')
    OS='Windows'
    ;;
  'Darwin') 
    open http://localhost:3001/api
    OS='Mac'
    ;;
  'SunOS')
    OS='Solaris'
    ;;
  'AIX') ;;
  *) ;;
esac


nest build
npm run start:dev
