# DB_Project_Server

## Preparation

### 1.create docker container

1.  Docker engine and docker-compose is needed for this project. See installation guides at <https://docs.docker.com/install/> and <https://docs.docker.com/compose/install/>
2.  To create docker container, run the command below. This will create container named 'db.test' based on mysql docker image with the environment determined in ./docker/db.test.docker-compose.yml

```
	./docker/db.test.sh
```

3.  Make sure that docker is running and start 'db.test' container. The container will run on port 3307.

### 2.prepare database

1.  Manage the database via MySQL Workbench or any database manager. set connection parameters with

* Hostname: 127.0.0.1
* Port: 3307
* Username: testuser

2.  conncet to database. use password: bN6t7rgcvSjjTVAn
3.  import structure and data from ./docker/db.test.dump.sql
