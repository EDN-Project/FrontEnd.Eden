import psycopg2

connection_string = "dbname=eden user=postgres password=ahmed2003 host=localhost port=5432"
conn = psycopg2.connect(connection_string)

cur = conn.cursor()
cur.execute("SELECT * FROM actor.user")

data = cur.fetchall()
print(data)