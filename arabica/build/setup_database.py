import subprocess
import os
import getpass

def setup_pgpass(remote,user,pw):
    if (user is not None) and (pw is None):
        pw = getpass.getpass("Enter password for user %s: " % user)

    if pw is not None:
        if not os.path.exists('temp'):
            os.mkdir('temp')
        execute_shell("echo *:*:*:%s:%s > temp/pgpass" % (user,pw))
        execute_shell("chmod 600 temp/pgpass")
        return "PGPASSFILE=temp/pgpass "
    else:
        return ""

def execute_shell(cmd):
    print(" +" + cmd)
    return subprocess.Popen(cmd, shell=True, bufsize=32768, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()


# Check if on test server
use_login = 'ARABICA_USE_LOGIN' in os.environ
print("USE LOGIN " + str(use_login))


if use_login:
    jenkins_user = os.environ['ARABICA_POSTGRES_LOGIN_USR']
    login_data = setup_pgpass(None, jenkins_user, os.environ['ARABICA_POSTGRES_LOGIN_PSW'])
    jenkins_flag = "-U " + os.environ['ARABICA_POSTGRES_LOGIN_USR']
else:
    jenkins_user = ""
    login_data = ""
    jenkins_flag = ""


stdout_data, stderr_data = execute_shell("%spsql -lqt %s -h localhost | cut -d \| -f 1" % (login_data, jenkins_flag))
if "arabica_db" in stdout_data:
    # Drop the database
    execute_shell("%sdropdb -h localhost %s arabica_db" % (login_data, jenkins_flag))

# Create the new database
execute_shell("%screatedb -h localhost %s arabica_db" % (login_data, jenkins_flag))
execute_shell("%spsql -h localhost %s arabica_db < arabica.sql" % (login_data, jenkins_flag))
