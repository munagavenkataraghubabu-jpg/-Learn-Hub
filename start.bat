@echo off
title LearnHub Local Web Server
echo ========================================================
echo  Starting LearnHub Student Learning Platform...
echo  Local URL: http://localhost:3000/
echo ========================================================
start http://localhost:3000/
node server.js
pause
