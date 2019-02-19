import subprocess

def execute_shell(cmd):
    print(" +" + cmd)
    return subprocess.Popen(cmd, shell=True, bufsize=32768, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).communicate()


stdout_data, stderr_data = execute_shell("psql -lqt | cut -d \| -f 1")
if "titan_db" in stdout_data:
    # Drop the database
    execute_shell("dropdb -h localhost titan_db")

# Create the new database
execute_shell("createdb -h localhost titan_db")
execute_shell("psql -h localhost -p 5432 titan_db < titan.sql")
