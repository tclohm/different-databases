# Spin up a docker postgres

- docker run -e POSTGRES_PASSWORD=postgres --name pg1 postgres

## ssh into it

- docker exec -it pg1 psql -U postgres

## create table

- create table temp(t int);

## insert into table

- insert into temp(t) select random()*100 from generate_series(0, 1000000);
