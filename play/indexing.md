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