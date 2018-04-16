#!/bin/bash
sudo docker-compose -f db.test.docker-compose.yml up -d
echo 'start db.test container'
sudo docker start db.test






