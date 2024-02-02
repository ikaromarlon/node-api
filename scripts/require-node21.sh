#!/bin/bash

# get the Node.js version
NODE_VERSION=$(node -v)

# extract the major version number
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | cut -c2-)

# check if the major version is less than 21
if [ "$NODE_MAJOR_VERSION" -lt 21 ]; then
  echo "Error: Node.js version 21 or higher is required."
  exit 1
fi
