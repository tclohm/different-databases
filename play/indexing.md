# Indexing

- data structure that tries to analyze and summarize a shortcut
- kinda of like a phonebook, (a-z), using b-tree and lsm trees
- every primary key has an indexing by default, with a b-tree

## Explain

- explain analyze select id from employees where id = 2000;
- scan the index because it's smaller and that means faster!
- sequential scans aka full table are the worst

## create index

- create index employees_name on employees(name);
- create index id_idx on grades(id);

## drop index

- drop index id_x;

## create index include value

- create index id_idx on grades(id) include (name);
- explain analyze select name from grades where id = 7;

note: pay attention to the cost. Bigger index = slower queries

## clean up

- vacuum (verbose) students;
or
- vacuum (verbose);

## create index 

- writes a blocked
- reads work though

## create index concurrently
- create index concurrently g on grades(g);
- takes memory and can potential fail



### Consider a table with three columns, A, B and C. A is an integer primary key (clustered). B and C are integers. There is a composite index on both B and C respectively.

`SELECT A FROM T WHERE B = 1 AND C = 3;`
- planner will use the B,C composite index
`SELECT B, C FROM T WHERE A = 1;`
- planner will use the primary key index
`SELECT * FROM T WHERE C = 5;`
- depending on the DB, planner will either use the clustered index to scan the entire table or scan the entire table directly


### Table T with a single column A which has an index. The table has 100 million rows.
`SELECT COUNT(A) FROM T WHERE A BETWEEN (10, 50);`
`SELECT MAX(A) FROM T;`
`SELECT MIN(A) FROM T;`

index on A and we only want to count rows between 10 and 50 this is handful and next
to each other so a b-tree index scan will be great for this. 3 and 4 will use the index
to jump to the start and the end of the index accordingly (index is sorted)

A table T with columns A, B, and C. We have an index on A and another index on B
index only scan: `SELECT COUNT(*) FROM T WHERE A > 1 AND A < 10;`