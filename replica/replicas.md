# Master / Backup Replication

- One Master/Leader node that accepts writes / ddls
- One or more backup/standby nodes that receive those writes from the master
	- master replicates the data to the backup nodes and they are read
- Simple to implement no conflicts

# Multi-Master Replication

- Multiple Master / Leader node that accepts writes / ddls
- One or more backup / follower nodes that receive those writes from the masters
- Need to resolves conflict

# Synchronous vs Asynchronous Replication

- Sync replication, write transaction to the master will be blocked until written to the backup / standby nodes
- Async replication, write transaction is considered successful if it written to the master, then async the writes to backup nodes

-v : volume
-e : environment
-d : detach

`docker run --name pmaster -p 5432:5432 -v /User/name/postgres/rep/pmaster_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=postgres -d postgres`

`docker run --name pstandby -p 5433:5433 -v /User/name/postgres/rep/pstandby_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=postgres -d postgres`

`mv pstandby_data pstandby_data_bk`

`cp -R pmaster_data pstandby_data`

`docker start pmaster pstandby`

`vim ph_hba.conf` -- in master
`host replication postgres`

`cd standby_data`
`vim postgresql.conf`

`primary_conninfo = 'application_name=standby1 host=localhost port=5432 user=postgres password=password'`

`docker stop pmaster pstandby`

in standby_data
`touch standby.signal`

in pmaster_data
`vim postgresql.conf`

`synchronous_standby_names ='first 1 (standby1)'`
`synchronous_standby_names ='first 3 (application_name1,application_name2,application_name3)'`

`docker start pmaster pstandby`

`docker logs pmaster`