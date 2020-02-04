Open When Dockerized

    - Version 2 of https://github.com/darrylforbes/open_when

    - Improvements
        - Dockerized
        - More organized cloud infrastruture
        - Better coding practices

Planned Architecture

    - EC2
        - Container 1: Django REST API served using Gunicorn
        - Container 2: NGINX
        - Container 3: Development postgres database

    - RDS
        - Production postgres database
    
    - S3
        - React app

Notes

    - Don't forget to run collectstatic and migrate
