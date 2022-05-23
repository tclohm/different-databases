# ACID

## Atomicity -- commit all or nothing

- A commit at the end of a transaction will flush the WAL (Write Ahead Log) changes and as a result we will either get a success if the write happened or failure if anything went wrong. If the power went off before the commit we won't get any change, if the power went off right after the commit we will get the correct result. If the power went out during the commit the database will restart and detect the the half/commit state and rollback all changes. If any failure happens during an execution of one of the statements the DB will rollback the transaction and all the changes.

## Consistency

If you have a primary DB with 4 worker replicas. Writes are faster since the only commit we need to wait for are the primary's however there will be reads of off the worker nodes that will mismatch with the primary node. Thus the system will have 'eventual consistency' or perhaps weaker than that. 

## Isolation

- Any transaction started before with a repeatable read isolation level or higher means that it will not pick up committed reads by design. However transactions started after will see all committed changes

- Phantom Reads can occur depending on the isolation level of the reading transaction but all of these queries if repeated can give an additional result. ID = 1000 might not exist but some other transaction might have inserted it. New employees might have joined before this date and results might show up. And unbounded query (no where clause) will show any new row that is inserted to the table.

- Repeatable read isolation level only guarantees if you read a value that value will remain unchanged. This however doesn't apply to phantom reads. Postgres repeatable read however is implemented as snapshot isolation so it doesn't allow for phantom reads.

## Durability

- If a crash happens during a commit the database cannot guarantee durability. The system is durable only when the commit is successful (the data is fully written to disk). That is why commit speeds are critical, the faster you can commit the lower the chances of such corruption. 
