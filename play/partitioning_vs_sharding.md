# Horizontal Partitioning vs Sharding

- HP splits big table into multiple tables in the same database, client agnostic
- Sharding splits big tables into mutiple tables across multiple database servers
- HP table name changes (or schema)
- Sharding everthing is the same but server changes

### Pros of Partitioning
- improves query performance when accessing a single partition
- sequential scan vs scattered index scan
- easy bulk loading (attach partition)
- archive old data that are barely accessed into cheap storage

### Cons of Partitioning
- updates that move rows from a partition to another can be slow or fail sometimes
- inefficient queries could accidentally scan all partitions resulting in slower performance
- schema changes can be challenging (DBMS could manage it though)


`
create table grades_org (id serial not null, g int not null);
insert into grades_org(g) select floor(random()*100) from generate_series(0, 10000000);
create index grades_org_index on grades_org(g);
create table_parts (id serial not null, g int not null) partition by range(g);
create table g0035 (like grades_parts including indexes);
create table g3560 (like grades_parts including indexes);
create table g6080 (like grades_parts including indexes);
create table g80100 (like grades_parts including indexes);
create index grades_parts_idx on grades_parts(g);
alter table grades_parts attach partition g0035 for values from (0) to (35);
alter table grades_parts attach partition g3560 for values from (35) to (60);
alter table grades_parts attach partition g6080 for values from (60) to (80);
alter table grades_parts attach partition g80100 for values from (80) to (100);
insert into grades_parts select * from grades_org;
show ENABLE_PARTITION_PRUNING;
set enable_partition_pruning = on;
`


##### shard -> partition -> index


# Sharding
- split data into different databases
- use consistent hashing to split data
- ex: num(input2) % n -- if you have n nodes

