# Master / Backup Replication

- One Master/Leader node that accepts writes / ddls
- One or more backup/standby nodes that receive those writes from the master
	- master replicates the data to the backup nodes and they are read
- Simple to implement no conflicts

# Multi-Master Replication

- Multiple Master / Leader node that accepts writes / ddls
- One or more backup / follower nodes that receive those writes from the masters
- Need to resolves conflict