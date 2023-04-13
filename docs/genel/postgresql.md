## POSTGRESQL

You can retrieve the list of column name by simple query and then remove those column by apply where query like this.

```sql

    SELECT * FROM (
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = N'TableName'
        ) AS allColumns
    WHERE allColumns.COLUMN_NAME NOT IN ('unwantedCol1')
```