command -v protein >/dev/null 2>&1 || { echo >&2 "proteinjs must be installed.('npm install proteinjs -g')  Aborting."; exit 1; }
command -v xmllint >/dev/null 2>&1 || { echo >&2 "xmllint must be installed.('libxml2-utils package in debian')  Aborting."; exit 1; }
