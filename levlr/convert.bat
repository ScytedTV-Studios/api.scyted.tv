@echo off
set CSV_FILE=userdata.csv
set JSON_FILE=userdata.json

csvjson %CSV_FILE% --no-inference | jq . > %JSON_FILE%

pause