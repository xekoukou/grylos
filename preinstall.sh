command -v ribosome.js >/dev/null 2>&1 || { echo >&2 "ribosome must be installed.('github.com/sustrik/ribosome')  Aborting."; exit 1; }
command -v xmllint >/dev/null 2>&1 || { echo >&2 "xmllint must be installed.('libxml2-utils package in debian')  Aborting."; exit 1; }
