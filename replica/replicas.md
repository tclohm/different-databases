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

- cool beans