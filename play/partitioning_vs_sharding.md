# Horizontal Partitioning vs Sharding

- HP splits big table into multiple tables in the same database, client agnostic
- Sharding splits big tables into mutiple tables across multiple database servers
- HP table name changes (or schema)
- Sharding everthing is the same buy server changes

### Pros of Partitioning
- improves query performance when accessing a single partition
- sequential scan vs scattered index scan
- easy bulk loading (attach partition)
- archive old data that are barely accessed into cheap storage

### Cons of Partitioning
- updates that move rows from a partition to another can be slow or fail sometimes
- inefficient queries could accidentally scan all partitions resulting in slower performance
- schema changes can be challenging (DBMS could manage it though)