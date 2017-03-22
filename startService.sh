#!/bin/bash

nohup mongod -dbpath=data &
sudo nohup node main.js &

